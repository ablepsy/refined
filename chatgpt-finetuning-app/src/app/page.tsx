import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">ChatGPT Fine-Tuning App</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-card p-6 rounded-lg shadow-md border">
            <h2 className="text-2xl font-semibold mb-4">Chat with GPT</h2>
            <p className="mb-6 text-muted-foreground">
              Start a conversation with ChatGPT. Your interactions will be logged for fine-tuning purposes.
            </p>
            <Link href="/chat">
              <Button className="w-full">Start Chatting</Button>
            </Link>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-md border">
            <h2 className="text-2xl font-semibold mb-4">Conversation History</h2>
            <p className="mb-6 text-muted-foreground">
              Browse your past conversations and review logged data for fine-tuning.
            </p>
            <Link href="/history">
              <Button className="w-full" variant="outline">View History</Button>
            </Link>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-md border">
            <h2 className="text-2xl font-semibold mb-4">Fine-Tuning Dashboard</h2>
            <p className="mb-6 text-muted-foreground">
              Prepare and manage your fine-tuning jobs, monitor progress, and view results.
            </p>
            <Link href="/fine-tuning">
              <Button className="w-full" variant="outline">Fine-Tuning Dashboard</Button>
            </Link>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-md border">
            <h2 className="text-2xl font-semibold mb-4">Settings</h2>
            <p className="mb-6 text-muted-foreground">
              Configure your API key, model preferences, and application settings.
            </p>
            <Link href="/settings">
              <Button className="w-full" variant="outline">Settings</Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">About This Application</h2>
          <p className="mb-4">
            This application allows you to chat with ChatGPT, store your conversations locally, 
            and use that data to fine-tune the model to better match your preferences and instructions.
          </p>
          <p>
            Your conversations are stored locally on your machine, and you can easily prepare and 
            submit them for fine-tuning using your own OpenAI API key.
          </p>
        </div>
      </div>
    </main>
  );
}
