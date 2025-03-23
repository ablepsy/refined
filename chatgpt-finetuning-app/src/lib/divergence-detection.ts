/**
 * Divergence Detection Module
 * 
 * This module provides functionality to detect when inputs or outputs
 * significantly diverge from expected patterns or previous conversations.
 */

import { Message } from '@/lib/storage/conversations';
import { getOpenAIClient } from '@/lib/openai';
import { getAllSettings } from '@/lib/storage/settings';

// Types for divergence detection
export interface DivergenceResult {
  isDivergent: boolean;
  score: number;
  threshold: number;
  reason: string | null;
}

/**
 * Detect divergence in a message compared to expected patterns
 * 
 * @param message The message to analyze
 * @param previousMessages Previous messages in the conversation for context
 * @returns Divergence detection result
 */
export async function detectMessageDivergence(
  message: Message,
  previousMessages: Message[]
): Promise<DivergenceResult> {
  try {
    const settings = getAllSettings();
    
    // Skip divergence detection if disabled in settings
    if (!settings.autoDivergenceDetection) {
      return {
        isDivergent: false,
        score: 0,
        threshold: 0.7,
        reason: null
      };
    }
    
    // In a real implementation, this would use embeddings and similarity calculations
    // For now, we'll use a simpler approach with the OpenAI API
    
    const openai = getOpenAIClient();
    
    if (!openai) {
      throw new Error('OpenAI client not configured');
    }
    
    // Create a prompt for divergence detection
    const prompt = createDivergenceDetectionPrompt(message, previousMessages);
    
    // Call OpenAI API to analyze the message
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant that analyzes conversations for unusual patterns or divergences from expected behavior. Respond with a JSON object containing isDivergent (boolean), score (number from 0 to 1), and reason (string or null).'
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
    let divergenceData: Partial<DivergenceResult> = {};
    
    try {
      divergenceData = JSON.parse(responseText);
    } catch (error) {
      console.error('Error parsing divergence detection response:', error);
      // Use default values if parsing fails
      divergenceData = {
        isDivergent: false,
        score: 0,
        reason: null
      };
    }
    
    // Apply threshold
    const threshold = 0.7; // Configurable threshold
    const score = divergenceData.score || 0;
    
    return {
      isDivergent: score > threshold,
      score,
      threshold,
      reason: divergenceData.reason || null
    };
  } catch (error) {
    console.error('Error detecting message divergence:', error);
    // Return a non-divergent result in case of error
    return {
      isDivergent: false,
      score: 0,
      threshold: 0.7,
      reason: null
    };
  }
}

/**
 * Create a prompt for divergence detection
 * 
 * @param message The message to analyze
 * @param previousMessages Previous messages in the conversation for context
 * @returns Prompt for divergence detection
 */
function createDivergenceDetectionPrompt(
  message: Message,
  previousMessages: Message[]
): string {
  // Create a context string from previous messages
  const context = previousMessages
    .map(msg => `${msg.role}: ${msg.content}`)
    .join('\n\n');
  
  // Create the prompt
  return `
Analyze the following message for unusual patterns or significant divergences from expected behavior.

Context (previous messages):
${context}

Message to analyze (${message.role}):
${message.content}

Is this message significantly different from what you would expect in this conversation?
Consider factors like:
1. Tone and style consistency
2. Topic relevance
3. Logical flow from previous messages
4. Unusual requests or instructions
5. Semantic coherence

Respond with a JSON object containing:
- isDivergent: boolean indicating if the message significantly diverges
- score: number from 0 to 1 indicating the divergence score (higher = more divergent)
- reason: string explaining why the message is divergent, or null if not divergent
`;
}

/**
 * Detect divergence in a conversation
 * 
 * @param messages Array of messages in the conversation
 * @returns Divergence detection result for the conversation
 */
export async function detectConversationDivergence(
  messages: Message[]
): Promise<DivergenceResult> {
  try {
    const settings = getAllSettings();
    
    // Skip divergence detection if disabled in settings
    if (!settings.autoDivergenceDetection) {
      return {
        isDivergent: false,
        score: 0,
        threshold: 0.7,
        reason: null
      };
    }
    
    // In a real implementation, this would use embeddings and similarity calculations
    // For now, we'll use a simpler approach with the OpenAI API
    
    const openai = getOpenAIClient();
    
    if (!openai) {
      throw new Error('OpenAI client not configured');
    }
    
    // Create a prompt for conversation divergence detection
    const prompt = createConversationDivergencePrompt(messages);
    
    // Call OpenAI API to analyze the conversation
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant that analyzes conversations for unusual patterns or divergences from expected behavior. Respond with a JSON object containing isDivergent (boolean), score (number from 0 to 1), and reason (string or null).'
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
    let divergenceData: Partial<DivergenceResult> = {};
    
    try {
      divergenceData = JSON.parse(responseText);
    } catch (error) {
      console.error('Error parsing conversation divergence detection response:', error);
      // Use default values if parsing fails
      divergenceData = {
        isDivergent: false,
        score: 0,
        reason: null
      };
    }
    
    // Apply threshold
    const threshold = 0.7; // Configurable threshold
    const score = divergenceData.score || 0;
    
    return {
      isDivergent: score > threshold,
      score,
      threshold,
      reason: divergenceData.reason || null
    };
  } catch (error) {
    console.error('Error detecting conversation divergence:', error);
    // Return a non-divergent result in case of error
    return {
      isDivergent: false,
      score: 0,
      threshold: 0.7,
      reason: null
    };
  }
}

/**
 * Create a prompt for conversation divergence detection
 * 
 * @param messages Array of messages in the conversation
 * @returns Prompt for conversation divergence detection
 */
function createConversationDivergencePrompt(messages: Message[]): string {
  // Create a conversation string
  const conversation = messages
    .map(msg => `${msg.role}: ${msg.content}`)
    .join('\n\n');
  
  // Create the prompt
  return `
Analyze the following conversation for unusual patterns or significant divergences from expected behavior.

Conversation:
${conversation}

Is this conversation significantly different from what you would expect in a typical conversation?
Consider factors like:
1. Overall coherence and flow
2. Topic consistency
3. Unusual requests or instructions
4. Semantic patterns that deviate from norms
5. Potential misuse or attempts to manipulate the AI

Respond with a JSON object containing:
- isDivergent: boolean indicating if the conversation significantly diverges
- score: number from 0 to 1 indicating the divergence score (higher = more divergent)
- reason: string explaining why the conversation is divergent, or null if not divergent
`;
}

/**
 * Calculate similarity between two text embeddings
 * 
 * @param embedding1 First embedding vector
 * @param embedding2 Second embedding vector
 * @returns Cosine similarity score (0-1)
 */
function calculateCosineSimilarity(embedding1: number[], embedding2: number[]): number {
  // Ensure embeddings are of the same length
  if (embedding1.length !== embedding2.length) {
    throw new Error('Embeddings must be of the same length');
  }
  
  // Calculate dot product
  let dotProduct = 0;
  for (let i = 0; i < embedding1.length; i++) {
    dotProduct += embedding1[i] * embedding2[i];
  }
  
  // Calculate magnitudes
  let magnitude1 = 0;
  let magnitude2 = 0;
  for (let i = 0; i < embedding1.length; i++) {
    magnitude1 += embedding1[i] * embedding1[i];
    magnitude2 += embedding2[i] * embedding2[i];
  }
  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);
  
  // Calculate cosine similarity
  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;
  }
  
  return dotProduct / (magnitude1 * magnitude2);
}
