-- Initial database schema for ChatGPT Fine-Tuning Application

-- Conversations table to store chat conversations
CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_flagged BOOLEAN NOT NULL DEFAULT FALSE,
  flagged_reason TEXT
);

-- Messages table to store individual messages in conversations
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
);

-- Distillations table to store distilled information from conversations
CREATE TABLE IF NOT EXISTS distillations (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  summary TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
);

-- DistillationItems table to store individual items in distillations
CREATE TABLE IF NOT EXISTS distillation_items (
  id TEXT PRIMARY KEY,
  distillation_id TEXT NOT NULL,
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  FOREIGN KEY (distillation_id) REFERENCES distillations(id) ON DELETE CASCADE
);

-- FineTuningJobs table to store fine-tuning job information
CREATE TABLE IF NOT EXISTS fine_tuning_jobs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  model TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  openai_job_id TEXT,
  training_file TEXT,
  epochs INTEGER NOT NULL DEFAULT 3,
  error_message TEXT
);

-- Datasets table to store information about datasets for fine-tuning
CREATE TABLE IF NOT EXISTS datasets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  conversation_count INTEGER,
  message_count INTEGER
);

-- DatasetConversations table to track which conversations are in which datasets
CREATE TABLE IF NOT EXISTS dataset_conversations (
  dataset_id TEXT NOT NULL,
  conversation_id TEXT NOT NULL,
  PRIMARY KEY (dataset_id, conversation_id),
  FOREIGN KEY (dataset_id) REFERENCES datasets(id) ON DELETE CASCADE,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_distillations_conversation_id ON distillations(conversation_id);
CREATE INDEX IF NOT EXISTS idx_distillation_items_distillation_id ON distillation_items(distillation_id);
CREATE INDEX IF NOT EXISTS idx_dataset_conversations_dataset_id ON dataset_conversations(dataset_id);
CREATE INDEX IF NOT EXISTS idx_dataset_conversations_conversation_id ON dataset_conversations(conversation_id);
