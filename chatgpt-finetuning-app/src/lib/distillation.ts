/**
 * Information Distillation Module
 * 
 * This module provides functionality to analyze conversations and extract
 * key information, insights, and patterns.
 */

import { Message } from '@/lib/storage/conversations';
import { getOpenAIClient } from '@/lib/openai';

// Types for distillation
export interface DistillationResult {
  summary: string;
  keyPoints: string[];
  topics: string[];
  suggestedFinetuningPoints: string[];
}

/**
 * Distill information from a conversation
 * 
 * @param messages Array of messages in the conversation
 * @returns Distilled information from the conversation
 */
export async function distillConversation(
  messages: Message[]
): Promise<DistillationResult> {
  try {
    const openai = getOpenAIClient();
    
    if (!openai) {
      throw new Error('OpenAI client not configured');
    }
    
    // Create a prompt for information distillation
    const prompt = createDistillationPrompt(messages);
    
    // Call OpenAI API to analyze the conversation
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant that analyzes conversations and extracts key information, insights, and patterns. Respond with a JSON object containing summary (string), keyPoints (array of strings), topics (array of strings), and suggestedFinetuningPoints (array of strings).'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.2,
    });
    
    // Parse the response
    const responseText = completion.choices[0].message.content || '';
    let distillationData: Partial<DistillationResult> = {};
    
    try {
      distillationData = JSON.parse(responseText);
    } catch (error) {
      console.error('Error parsing distillation response:', error);
      // Use default values if parsing fails
      distillationData = {
        summary: 'Failed to generate summary.',
        keyPoints: ['Failed to extract key points.'],
        topics: ['Unknown'],
        suggestedFinetuningPoints: ['No suggestions available.']
      };
    }
    
    return {
      summary: distillationData.summary || 'No summary available.',
      keyPoints: distillationData.keyPoints || ['No key points identified.'],
      topics: distillationData.topics || ['No topics identified.'],
      suggestedFinetuningPoints: distillationData.suggestedFinetuningPoints || ['No fine-tuning suggestions available.']
    };
  } catch (error) {
    console.error('Error distilling conversation:', error);
    // Return default values in case of error
    return {
      summary: 'Error occurred during distillation.',
      keyPoints: ['Error occurred during key point extraction.'],
      topics: ['Error'],
      suggestedFinetuningPoints: ['Error occurred during suggestion generation.']
    };
  }
}

/**
 * Create a prompt for information distillation
 * 
 * @param messages Array of messages in the conversation
 * @returns Prompt for information distillation
 */
function createDistillationPrompt(messages: Message[]): string {
  // Create a conversation string
  const conversation = messages
    .map(msg => `${msg.role}: ${msg.content}`)
    .join('\n\n');
  
  // Create the prompt
  return `
Analyze the following conversation and extract key information, insights, and patterns.

Conversation:
${conversation}

Please provide:
1. A concise summary of the entire conversation
2. Key points and important information from the conversation
3. Main topics discussed in the conversation
4. Suggestions for fine-tuning points (what patterns should be reinforced in a fine-tuned model)

Respond with a JSON object containing:
- summary: string with a concise overview of the conversation
- keyPoints: array of strings with the most important information and insights
- topics: array of strings with the main subjects discussed
- suggestedFinetuningPoints: array of strings with recommendations for fine-tuning
`;
}

/**
 * Save distillation result to the database
 * 
 * @param conversationId The ID of the conversation
 * @param distillationResult The distillation result to save
 * @returns The ID of the saved distillation
 */
export async function saveDistillationResult(
  conversationId: string,
  distillationResult: DistillationResult
): Promise<string> {
  try {
    // In a real implementation, this would save to the database
    // For now, we'll just return a mock ID
    return `dist-${Date.now()}`;
  } catch (error) {
    console.error('Error saving distillation result:', error);
    throw new Error('Failed to save distillation result');
  }
}

/**
 * Get distillation result by ID
 * 
 * @param distillationId The ID of the distillation
 * @returns The distillation result
 */
export async function getDistillationResult(
  distillationId: string
): Promise<DistillationResult | null> {
  try {
    // In a real implementation, this would fetch from the database
    // For now, we'll just return null
    return null;
  } catch (error) {
    console.error('Error getting distillation result:', error);
    throw new Error('Failed to get distillation result');
  }
}
