import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DistillationPage() {
  // Sample distillation result
  const distillationResult = {
    conversationTitle: "Understanding Fine-Tuning",
    distilledAt: "Mar 18, 2025 14:45",
    keyPoints: [
      "User is interested in understanding fine-tuning process",
      "User wants to create a custom model based on their interactions",
      "User needs guidance on preparing data for fine-tuning",
      "User is concerned about API usage costs"
    ],
    summary: "This conversation covers the basics of fine-tuning GPT models, including data preparation, model selection, and implementation considerations. The user is interested in creating a custom model that learns from their interactions and preferences.",
    topics: [
      "Fine-tuning",
      "Machine Learning",
      "Data Preparation",
      "Model Training",
      "API Integration"
    ],
    suggestedFinetuningPoints: [
      "The assistant should provide detailed explanations about technical concepts",
      "The assistant should include code examples when explaining implementation details",
      "The assistant should check for understanding after explaining complex topics",
      "The assistant should suggest resources for further learning"
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Distilled Information</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </Button>
          <Link href="/chat">
            <Button variant="outline" size="sm">Back to Chat</Button>
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <Card className="p-4 mb-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold">{distillationResult.conversationTitle}</h2>
              <p className="text-sm text-muted-foreground">Distilled on {distillationResult.distilledAt}</p>
            </div>
            <Badge>AI Analyzed</Badge>
          </div>
          
          <div className="mb-4">
            <h3 className="text-md font-medium mb-2">Summary</h3>
            <p className="text-sm bg-muted p-3 rounded-md">{distillationResult.summary}</p>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="keyPoints">
        <TabsList className="mb-4">
          <TabsTrigger value="keyPoints">Key Points</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="finetuning">Fine-Tuning Suggestions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="keyPoints">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Key Points</h3>
            <ul className="space-y-2">
              {distillationResult.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5">
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>
        
        <TabsContent value="topics">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Identified Topics</h3>
            <div className="flex flex-wrap gap-2">
              {distillationResult.topics.map((topic, index) => (
                <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                  {topic}
                </Badge>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="finetuning">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Suggested Fine-Tuning Points</h3>
            <ul className="space-y-2">
              {distillationResult.suggestedFinetuningPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5">
                    <path d="M12 2v4" />
                    <path d="M12 18v4" />
                    <path d="M4.93 4.93l2.83 2.83" />
                    <path d="M16.24 16.24l2.83 2.83" />
                    <path d="M2 12h4" />
                    <path d="M18 12h4" />
                    <path d="M4.93 19.07l2.83-2.83" />
                    <path d="M16.24 7.76l2.83-2.83" />
                  </svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-end">
              <Button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M21 2v6h-6" />
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                  <path d="M3 22v-6h6" />
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                </svg>
                Add to Fine-Tuning Dataset
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
