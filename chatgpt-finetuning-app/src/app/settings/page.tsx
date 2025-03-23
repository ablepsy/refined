import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { 
  FormLabel
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Link href="/">
          <Button variant="outline" size="sm">Back to Home</Button>
        </Link>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">API Configuration</h2>
          <div className="space-y-4">
            <div>
              <FormLabel htmlFor="api-key">OpenAI API Key</FormLabel>
              <div className="flex gap-2 mt-1.5">
                <Input 
                  id="api-key"
                  type="password" 
                  placeholder="sk-..." 
                  className="flex-1"
                />
                <Button variant="outline">Save Key</Button>
              </div>
              <p className="text-sm text-muted-foreground mt-1.5">
                Your API key is stored securely on your local machine and is never sent to our servers.
              </p>
            </div>
            
            <div className="pt-2">
              <FormLabel htmlFor="model-select">Default Chat Model</FormLabel>
              <Select>
                <SelectTrigger id="model-select" className="mt-1.5">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Fine-Tuning Settings</h2>
          <div className="space-y-4">
            <div>
              <FormLabel htmlFor="base-model">Base Model for Fine-Tuning</FormLabel>
              <Select>
                <SelectTrigger id="base-model" className="mt-1.5">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="babbage-002">Babbage-002</SelectItem>
                  <SelectItem value="davinci-002">Davinci-002</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <FormLabel htmlFor="epochs">Training Epochs</FormLabel>
              <Input 
                id="epochs"
                type="number" 
                defaultValue="3" 
                min="1"
                max="10"
                className="mt-1.5 w-full"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <FormLabel>Automatic Divergence Detection</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Automatically flag conversations with unusual patterns
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Storage Settings</h2>
          <div className="space-y-4">
            <div>
              <FormLabel htmlFor="storage-location">Local Storage Location</FormLabel>
              <div className="flex gap-2 mt-1.5">
                <Input 
                  id="storage-location"
                  type="text" 
                  placeholder="/path/to/storage" 
                  defaultValue="./data"
                  className="flex-1"
                />
                <Button variant="outline">Browse</Button>
              </div>
              <p className="text-sm text-muted-foreground mt-1.5">
                Location where conversation data and fine-tuning files will be stored
              </p>
            </div>

            <div className="pt-2">
              <Button variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Backup Database
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
