# ChatGPT Fine-Tuning Web Application

A web application that enables users to fine-tune ChatGPT based on text interactions. The application allows users to chat with ChatGPT, store conversations locally, and use the data to fine-tune the model according to user preferences and instructions.

## Features

- **Text-Based Interaction**: Clean, user-friendly interface for typing inputs and displaying ChatGPT's responses
- **Conversation History**: Browse and review previous conversations and logged data
- **Information Distillation**: Extract key points, insights, and important information from conversations with a single click
- **Divergence Detection**: Identifies when inputs or outputs significantly diverge from expected patterns
- **Local Data Storage**: Securely stores conversation logs and fine-tuning data on your local machine
- **Fine-Tuning Workflow**: Process to preprocess, package, and review collected data for fine-tuning
- **API Key Management**: Securely configure and store your OpenAI API key for all interactions
- **User Guidance**: Comprehensive documentation and error handling

## Tech Stack

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Data Analysis**: TensorFlow.js for divergence detection
- **API Integration**: OpenAI SDK

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- OpenAI API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/chatgpt-finetuning-app.git
   cd chatgpt-finetuning-app
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

3. Initialize the database:
   ```
   wrangler d1 execute DB --local --file=migrations/0001_initial.sql
   ```

4. Start the development server:
   ```
   pnpm dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

### Configuration

1. Go to the Settings page in the application
2. Enter your OpenAI API key
3. Configure your preferred models and storage location
4. Save your settings

## Usage

### Chatting with GPT

1. Navigate to the Chat page
2. Type your message in the input field
3. Press Enter or click the Send button
4. Your conversation will be saved locally

### Distilling Information

1. During or after a conversation, click the "Distill Information" button
2. The application will analyze your conversation and extract key information
3. View the distilled information on the results page

### Fine-Tuning ChatGPT

1. Go to the Fine-Tuning Dashboard
2. Create a dataset from your conversations
3. Configure your fine-tuning parameters
4. Start the fine-tuning process
5. Monitor progress and use your fine-tuned model when complete

## Deployment

See the [DEPLOYMENT.md](./DEPLOYMENT.md) file for detailed deployment instructions.

## Data Privacy

- All conversation data is stored locally on your machine
- Your OpenAI API key is securely stored locally
- No data is sent to external servers except to the OpenAI API for processing

## License

This project is licensed under the MIT License - see the LICENSE file for details.
