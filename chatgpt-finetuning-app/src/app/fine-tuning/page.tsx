import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FineTuningPage() {
  // Sample fine-tuning jobs data
  const jobs = [
    { 
      id: "ft-1", 
      name: "Custom Assistant v1", 
      model: "gpt-3.5-turbo",
      status: "completed",
      created: "Mar 15, 2025",
      trainingFiles: 1,
      epochs: 3
    },
    { 
      id: "ft-2", 
      name: "Technical Support Bot", 
      model: "gpt-3.5-turbo",
      status: "running",
      created: "Mar 17, 2025",
      trainingFiles: 2,
      epochs: 4,
      progress: 65
    },
    { 
      id: "ft-3", 
      name: "Creative Writing Assistant", 
      model: "davinci-002",
      status: "failed",
      created: "Mar 16, 2025",
      trainingFiles: 1,
      epochs: 2,
      error: "Insufficient examples in dataset"
    }
  ];

  // Sample datasets
  const datasets = [
    {
      id: "ds-1",
      name: "General Conversations",
      conversations: 24,
      messages: 156,
      size: "1.2 MB",
      lastUpdated: "Mar 17, 2025"
    },
    {
      id: "ds-2",
      name: "Technical Support",
      conversations: 18,
      messages: 203,
      size: "1.8 MB",
      lastUpdated: "Mar 16, 2025"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Fine-Tuning Dashboard</h1>
        <Link href="/">
          <Button variant="outline" size="sm">Back to Home</Button>
        </Link>
      </div>

      <Tabs defaultValue="jobs">
        <TabsList className="mb-6">
          <TabsTrigger value="jobs">Fine-Tuning Jobs</TabsTrigger>
          <TabsTrigger value="datasets">Datasets</TabsTrigger>
          <TabsTrigger value="new">Create New Job</TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobs">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Fine-Tuning Jobs</h2>
              <Button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                New Job
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Base Model</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.name}</TableCell>
                    <TableCell>{job.model}</TableCell>
                    <TableCell>
                      {job.status === "completed" && (
                        <Badge variant="success">Completed</Badge>
                      )}
                      {job.status === "running" && (
                        <Badge>Running</Badge>
                      )}
                      {job.status === "failed" && (
                        <Badge variant="destructive">Failed</Badge>
                      )}
                    </TableCell>
                    <TableCell>{job.created}</TableCell>
                    <TableCell>
                      {job.status === "running" && (
                        <div className="w-full">
                          <Progress value={job.progress} className="h-2" />
                          <span className="text-xs text-muted-foreground">{job.progress}%</span>
                        </div>
                      )}
                      {job.status === "completed" && (
                        <span className="text-xs text-muted-foreground">100% (Complete)</span>
                      )}
                      {job.status === "failed" && (
                        <span className="text-xs text-destructive">{job.error}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        <span className="sr-only">View</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        
        <TabsContent value="datasets">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Datasets</h2>
              <Button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                Create Dataset
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Conversations</TableHead>
                  <TableHead>Messages</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datasets.map((dataset) => (
                  <TableRow key={dataset.id}>
                    <TableCell className="font-medium">{dataset.name}</TableCell>
                    <TableCell>{dataset.conversations}</TableCell>
                    <TableCell>{dataset.messages}</TableCell>
                    <TableCell>{dataset.size}</TableCell>
                    <TableCell>{dataset.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                          <span className="sr-only">Download</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        
        <TabsContent value="new">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Create New Fine-Tuning Job</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Job Name</label>
                <input 
                  type="text" 
                  placeholder="Enter a name for your fine-tuning job"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Select Dataset</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="">Select a dataset</option>
                  {datasets.map(dataset => (
                    <option key={dataset.id} value={dataset.id}>
                      {dataset.name} ({dataset.conversations} conversations)
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Base Model</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="babbage-002">Babbage-002</option>
                  <option value="davinci-002">Davinci-002</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Training Epochs</label>
                <input 
                  type="number" 
                  defaultValue="3"
                  min="1"
                  max="10"
                  className="w-full p-2 border rounded-md"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  More epochs may improve results but will increase training time and cost.
                </p>
              </div>
              
              <div className="pt-4">
                <Button className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M21 2v6h-6" />
                    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                    <path d="M3 22v-6h6" />
                    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                  </svg>
                  Start Fine-Tuning
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
