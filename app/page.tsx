// pages/index.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Tooltip } from '@/components/ui/tooltip';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText }),
      });

      const data = await res.json();
      setResponseText(data.text);
      toast({ title: "הצלחה!" })
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-semibold mb-4">מתורגמן אוטיסטים</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Tooltip >
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="הזן טקסט כאן"
              className="w-full"
            />
          </Tooltip>
          <Tooltip>
            <Button type="submit" className="w-full">
              Generate
            </Button>
          </Tooltip>
        </form>
        {responseText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 p-2 bg-gray-100 rounded prose"
          >
            <ReactMarkdown>{responseText}</ReactMarkdown>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
