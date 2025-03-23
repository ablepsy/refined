import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function ChatPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Chat with GPT</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M12 3v12" />
              <path d="m8 11 4 4 4-4" />
              <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
            </svg>
            Distill Information
          </Button>
          <Link href="/">
            <Button variant="outline" size="sm">Back to Home</Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col h-[calc(100vh-12rem)]">
        <div className="flex-1 overflow-y-auto mb-4 border rounded-lg p-4 bg-muted/30">
          <div className="space-y-4">
            {/* System message */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M7 7h10" />
                  <path d="M7 12h10" />
                  <path d="M7 17h10" />
                </svg>
              </div>
              <Card className="p-3 max-w-[85%]">
                <p className="text-sm">I'm ChatGPT, your AI assistant. How can I help you today?</p>
              </Card>
            </div>

            {/* Sample user message */}
            <div className="flex items-start gap-3 justify-end">
              <Card className="p-3 max-w-[85%] bg-primary text-primary-foreground">
                <p className="text-sm">Can you help me understand how fine-tuning works?</p>
              </Card>
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>

            {/* Sample AI response */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M7 7h10" />
                  <path d="M7 12h10" />
                  <path d="M7 17h10" />
                </svg>
              </div>
              <Card className="p-3 max-w-[85%]">
                <p className="text-sm">Fine-tuning is a process that allows you to customize a pre-trained model like GPT to better suit your specific needs. It involves training the model on your own dataset of examples, which helps the model learn your preferred style, tone, and specific knowledge domains. This application helps you collect conversation data and prepare it for fine-tuning, making the process much easier.</p>
              </Card>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Input 
            placeholder="Type your message here..." 
            className="flex-1"
          />
          <Button>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
