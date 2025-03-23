/**
 * OpenAI API client configuration
 */

import OpenAI from 'openai';
import { getApiKey } from './storage/settings';

// Global OpenAI client instance
let openaiClient: OpenAI | null = null;

/**
 * Get the OpenAI client instance
 * Creates a new instance if one doesn't exist or if the API key has changed
 * 
 * @returns The OpenAI client instance or null if no API key is set
 */
export function getOpenAIClient(): OpenAI | null {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    return null;
  }
  
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true // For client-side usage
    });
  }
  
  return openaiClient;
}

/**
 * Reset the OpenAI client instance
 * This should be called when the API key is changed
 */
export function resetOpenAIClient(): void {
  openaiClient = null;
}

/**
 * Check if the OpenAI API key is valid
 * 
 * @returns True if the API key is valid, false otherwise
 */
export async function checkApiKey(): Promise<boolean> {
  try {
    const openai = getOpenAIClient();
    
    if (!openai) {
      return false;
    }
    
    // Make a simple API call to check if the key is valid
    await openai.models.list();
    
    return true;
  } catch (error) {
    console.error('Error checking API key:', error);
    return false;
  }
}
