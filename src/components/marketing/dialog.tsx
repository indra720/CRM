'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';
import { useMarketingDialog } from './provider';

export function MarketingDialog() {
  const { dialogState, closeDialog } = useMarketingDialog();
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      closeDialog();
      setFileName('');
    }
  };
  
  return (
    <Dialog open={dialogState.isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle className="text-xl">Marketing - {dialogState.title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
                <div className="space-y-2">
                    <Label htmlFor="message" className="font-medium">
                    Message
                    </Label>
                    <Textarea
                    id="message"
                    placeholder="Enter Message"
                    className="min-h-[100px] resize-none"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="url" className="font-medium">
                    URL
                    </Label>
                    <Input id="url" placeholder="Enter url" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="media-file" className="font-medium">
                    Media File
                    </Label>
                    <div className="flex items-center gap-2">
                          <Label htmlFor="media-file-input" className={
                            "cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                          }>
                            <Upload className="mr-2 h-4 w-4"/>
                            Choose file
                        </Label>
                        <Input id="media-file-input" type="file" className="hidden" onChange={handleFileChange} />
                        {fileName ? (
                            <span className="text-sm text-muted-foreground">{fileName}</span>
                        ) : (
                            <span className="text-sm text-muted-foreground">No file chosen</span>
                        )}
                    </div>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline">
                    Cancel
                    </Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
