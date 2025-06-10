import { useState, useEffect } from 'react';
import { sendGreeting } from './backend';
import { MessageCircle, RefreshCw, Plus, Minus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/card';
import { Button } from './components/ui/button';

function App() {
  // State for the greeting from backend
  const [greeting, setGreeting] = useState<string | null>(null);
  // State to track if we're loading the greeting
  const [isLoading, setIsLoading] = useState(false);
  // State for the counter
  const [counter, setCounter] = useState(0);

  // Function to fetch greeting from backend
  const fetchGreeting = async () => {
    setIsLoading(true);
    try {
      const response = await sendGreeting('World');
      setGreeting(response);
    } catch (error) {
      console.error('Failed to get greeting:', error);
      setGreeting('Error connecting to backend service');
    } finally {
      setIsLoading(false);
    }
  };

  // Counter functions
  const incrementCounter = () => setCounter(prevCount => prevCount + 1);
  const decrementCounter = () => setCounter(prevCount => prevCount - 1);

  // Fetch greeting on component mount
  useEffect(() => {
    fetchGreeting();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-center space-x-2">
          <MessageCircle className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Factory PWA App</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>React PWA Demo</CardTitle>
            <CardDescription>
              A progressive web app that works offline and can be installed on your device.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Message from Backend:</h3>
              {isLoading ? (
                <p className="text-muted-foreground">Loading greeting from service...</p>
              ) : (
                <p className="rounded bg-muted p-3 font-medium">{greeting}</p>
              )}
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              onClick={fetchGreeting} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Loading...</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh Greeting</span>
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Counter Card */}
        <Card>
          <CardHeader>
            <CardTitle>Interactive Counter</CardTitle>
            <CardDescription>
              A simple counter with increment and decrement functionality.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex flex-col items-center justify-center">
            <div className="text-4xl font-bold mb-4">{counter}</div>
          </CardContent>
          
          <CardFooter className="flex justify-center gap-4">
            <Button 
              onClick={decrementCounter}
              variant="outline"
              size="icon"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button 
              onClick={incrementCounter}
              variant="outline"
              size="icon"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <p className="text-center text-sm text-muted-foreground">
          Powered by React, TypeScript, and PWA technology
        </p>
      </div>
    </div>
  );
}

export default App;
