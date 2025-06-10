/**
 * backend.ts
 * 
 * This file provides mock implementations of backend functionality.
 * For the PWA version, we simulate the behavior that was previously handled by Rust.
 */

/**
 * Sends a greeting and returns the response with a timestamp.
 * This is a mock implementation that simulates the original Rust backend.
 * 
 * @param name - The name to greet
 * @returns A promise that resolves to the greeting message
 */
export async function sendGreeting(name: string): Promise<string> {
  try {
    // Simulate network delay (between 200-600ms)
    const delay = Math.floor(Math.random() * 400) + 200;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Get current timestamp
    const timestamp = Math.floor(Date.now() / 1000);
    
    // Return a greeting with timestamp (similar to what Rust did)
    return `Hello, ${name}! This message comes from the PWA backend! (Timestamp: ${timestamp})`;
  } catch (error) {
    console.error('Error in mock backend:', error);
    return `Error: Failed to generate greeting`;
  }
}
