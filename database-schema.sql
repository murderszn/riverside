-- PostgREST table schema for Riverside Rewards signups
-- This SQL should be run in your PostgREST/Supabase database

CREATE TABLE IF NOT EXISTS rewards_signups (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    terms_accepted BOOLEAN NOT NULL DEFAULT false,
    signup_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rewards_signups_email ON rewards_signups(email);
CREATE INDEX IF NOT EXISTS idx_rewards_signups_status ON rewards_signups(status);
CREATE INDEX IF NOT EXISTS idx_rewards_signups_signup_date ON rewards_signups(signup_date);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_rewards_signups_updated_at 
    BEFORE UPDATE ON rewards_signups 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for better security
ALTER TABLE rewards_signups ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows inserts (for signups) but restricts other operations
-- You may want to adjust this based on your needs
CREATE POLICY "Allow public signups" ON rewards_signups
    FOR INSERT WITH CHECK (true);

-- Optional: Create a policy for admin access (adjust based on your auth system)
-- CREATE POLICY "Admin access" ON rewards_signups
--     FOR ALL USING (auth.role() = 'admin');

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT ON rewards_signups TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE rewards_signups_id_seq TO anon, authenticated;
