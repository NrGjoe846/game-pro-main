/*
  # Create tables for user profiles and course progress

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique)
      - `full_name` (text)
      - `avatar_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `last_login` (timestamp)
      - `total_xp` (integer)
      - `current_level` (integer)
      - `streak_count` (integer)
      - `last_streak_date` (date)

    - `courses`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `difficulty` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `course_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `course_id` (uuid, references courses)
      - `completed_lessons` (jsonb)
      - `current_lesson` (integer)
      - `progress_percentage` (integer)
      - `started_at` (timestamp)
      - `last_accessed` (timestamp)
      - `completed_at` (timestamp)

    - `achievements`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `xp_reward` (integer)
      - `icon_url` (text)
      - `created_at` (timestamp)

    - `user_achievements`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `achievement_id` (uuid, references achievements)
      - `earned_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for data access
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  last_login TIMESTAMPTZ DEFAULT now(),
  total_xp INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  streak_count INTEGER DEFAULT 0,
  last_streak_date DATE DEFAULT CURRENT_DATE
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create course_progress table
CREATE TABLE IF NOT EXISTS course_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  completed_lessons JSONB DEFAULT '[]'::jsonb,
  current_lesson INTEGER DEFAULT 1,
  progress_percentage INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT now(),
  last_accessed TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, course_id)
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  xp_reward INTEGER DEFAULT 0,
  icon_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create policies for courses
CREATE POLICY "Anyone can view courses"
  ON courses
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for course_progress
CREATE POLICY "Users can view own course progress"
  ON course_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own course progress"
  ON course_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own course progress"
  ON course_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policies for achievements
CREATE POLICY "Anyone can view achievements"
  ON achievements
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for user_achievements
CREATE POLICY "Users can view own achievements"
  ON user_achievements
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, username, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Function to update user streak
CREATE OR REPLACE FUNCTION update_user_streak()
RETURNS TRIGGER AS $$
BEGIN
  -- Update streak only if last access was yesterday
  IF NEW.last_accessed::date = CURRENT_DATE AND 
     OLD.last_accessed::date = CURRENT_DATE - 1 THEN
    UPDATE user_profiles
    SET 
      streak_count = streak_count + 1,
      last_streak_date = CURRENT_DATE
    WHERE id = NEW.user_id;
  -- Reset streak if more than one day has passed
  ELSIF NEW.last_accessed::date > OLD.last_accessed::date + 1 THEN
    UPDATE user_profiles
    SET 
      streak_count = 1,
      last_streak_date = CURRENT_DATE
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for updating streaks
CREATE TRIGGER on_course_progress_update
  AFTER UPDATE OF last_accessed ON course_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_user_streak();