/**
 * Settings storage and management utilities
 */

// Default settings
const DEFAULT_SETTINGS = {
  apiKey: '',
  defaultModel: 'gpt-3.5-turbo',
  baseFineTuningModel: 'gpt-3.5-turbo',
  trainingEpochs: 3,
  autoDivergenceDetection: true,
  storageLocation: './data'
};

// In-memory settings cache
let settings = { ...DEFAULT_SETTINGS };

/**
 * Get all application settings
 * 
 * @returns All application settings
 */
export function getAllSettings() {
  // In a real implementation, this would load from local storage or a settings file
  return settings;
}

/**
 * Save all application settings
 * 
 * @param newSettings The new settings to save
 */
export function saveAllSettings(newSettings: typeof DEFAULT_SETTINGS) {
  // In a real implementation, this would save to local storage or a settings file
  settings = { ...newSettings };
}

/**
 * Get the OpenAI API key
 * 
 * @returns The API key or an empty string if not set
 */
export function getApiKey(): string {
  // In a real implementation, this would decrypt the stored API key
  return settings.apiKey;
}

/**
 * Save the OpenAI API key
 * 
 * @param apiKey The API key to save
 */
export function saveApiKey(apiKey: string) {
  // In a real implementation, this would encrypt the API key before storing
  settings.apiKey = apiKey;
}

/**
 * Get the default chat model
 * 
 * @returns The default chat model
 */
export function getDefaultModel(): string {
  return settings.defaultModel;
}

/**
 * Save the default chat model
 * 
 * @param model The model to set as default
 */
export function saveDefaultModel(model: string) {
  settings.defaultModel = model;
}

/**
 * Get the base model for fine-tuning
 * 
 * @returns The base model for fine-tuning
 */
export function getBaseFineTuningModel(): string {
  return settings.baseFineTuningModel;
}

/**
 * Save the base model for fine-tuning
 * 
 * @param model The model to set as base for fine-tuning
 */
export function saveBaseFineTuningModel(model: string) {
  settings.baseFineTuningModel = model;
}

/**
 * Get the number of training epochs for fine-tuning
 * 
 * @returns The number of training epochs
 */
export function getTrainingEpochs(): number {
  return settings.trainingEpochs;
}

/**
 * Save the number of training epochs for fine-tuning
 * 
 * @param epochs The number of epochs to use
 */
export function saveTrainingEpochs(epochs: number) {
  settings.trainingEpochs = epochs;
}

/**
 * Check if automatic divergence detection is enabled
 * 
 * @returns True if automatic divergence detection is enabled
 */
export function isAutoDivergenceDetectionEnabled(): boolean {
  return settings.autoDivergenceDetection;
}

/**
 * Enable or disable automatic divergence detection
 * 
 * @param enabled Whether to enable automatic divergence detection
 */
export function setAutoDivergenceDetection(enabled: boolean) {
  settings.autoDivergenceDetection = enabled;
}

/**
 * Get the storage location for local data
 * 
 * @returns The storage location path
 */
export function getStorageLocation(): string {
  return settings.storageLocation;
}

/**
 * Save the storage location for local data
 * 
 * @param location The storage location path
 */
export function saveStorageLocation(location: string) {
  settings.storageLocation = location;
}

/**
 * Reset all settings to defaults
 */
export function resetSettings() {
  settings = { ...DEFAULT_SETTINGS };
}
