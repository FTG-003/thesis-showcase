import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Share2, 
  Copy, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Mail, 
  QrCode,
  Check 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface SocialSharingProps {
  title?: string;
  description?: string;
  url?: string;
  hashtags?: string[];
  className?: string;
}

export const SocialSharing = ({ 
  title = "Cognitive Intraspecific Selection in Education",
  description = "A groundbreaking thesis exploring evolutionary approaches to educational development and collective intelligence building.",
  url = typeof window !== 'undefined' ? window.location.href : '',
  hashtags = ["CognitiveSelection", "Education", "Pyragogy", "CollectiveIntelligence", "AcademicResearch"],
  className = ""
}: SocialSharingProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const shareData = {
    title,
    description,
    url,
    hashtags: hashtags.join(' #')
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [type]: true }));
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard.`
      });
      
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [type]: false }));
      }, 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive"
      });
    }
  };

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags.join(','))}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${url}`)}`
  };

  const generateQRCode = async () => {
    // Generate QR code using a service or library
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
    return qrCodeUrl;
  };

  const openShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const generateCitation = () => {
    const currentYear = new Date().getFullYear();
    return `Terzi, F. (${currentYear}). Cognitive Intraspecific Selection in Education: From Individualism to Collective Strength — A Framework for Educational Evolution. Pyragogy Research Initiative. Retrieved from ${url}`;
  };

  const generateSectionLink = (sectionId: string) => {
    return `${url}#${sectionId}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={`glass hover:bg-primary/10 ${className}`}>
          <Share2 className="w-4 h-4 mr-2" />
          Share Research
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl glass border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif">Share This Research</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Quick Share Buttons */}
          <div>
            <h3 className="font-medium mb-3">Share on Social Media</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openShare('twitter')}
                className="flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30"
              >
                <Twitter className="w-4 h-4 text-blue-500" />
                Twitter
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => openShare('linkedin')}
                className="flex items-center gap-2 bg-blue-700/10 hover:bg-blue-700/20 border-blue-700/30"
              >
                <Linkedin className="w-4 h-4 text-blue-700" />
                LinkedIn
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => openShare('facebook')}
                className="flex items-center gap-2 bg-blue-600/10 hover:bg-blue-600/20 border-blue-600/30"
              >
                <Facebook className="w-4 h-4 text-blue-600" />
                Facebook
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => openShare('email')}
                className="flex items-center gap-2 bg-green-600/10 hover:bg-green-600/20 border-green-600/30"
              >
                <Mail className="w-4 h-4 text-green-600" />
                Email
              </Button>
            </div>
          </div>

          {/* Direct Links */}
          <div>
            <h3 className="font-medium mb-3">Direct Links</h3>
            <div className="space-y-3">
              <Card className="p-3 bg-muted/30">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground mb-1">Full Thesis</p>
                    <p className="text-sm font-mono truncate">{url}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(url, 'url')}
                    className="flex-shrink-0"
                  >
                    {copiedStates.url ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </Card>

              {/* Section-specific links */}
              {['abstract', 'key-points', 'resources'].map((section) => (
                <Card key={section} className="p-3 bg-muted/30">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground mb-1 capitalize">
                        {section.replace('-', ' ')} Section
                      </p>
                      <p className="text-sm font-mono truncate">
                        {generateSectionLink(section)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generateSectionLink(section), section)}
                      className="flex-shrink-0"
                    >
                      {copiedStates[section] ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Academic Citation */}
          <div>
            <h3 className="font-medium mb-3">Academic Citation</h3>
            <Card className="p-4 bg-muted/30">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-2">APA Style</p>
                  <p className="text-sm leading-relaxed font-serif">
                    {generateCitation()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(generateCitation(), 'citation')}
                  className="flex-shrink-0"
                >
                  {copiedStates.citation ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </Card>
          </div>

          {/* QR Code */}
          <div>
            <h3 className="font-medium mb-3">QR Code</h3>
            <Card className="p-4 bg-muted/30">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-white rounded-lg p-2">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`}
                    alt="QR Code for thesis"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">
                    Scan to access on mobile devices
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Save or print this QR code to share the research offline
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Hashtags */}
          <div>
            <h3 className="font-medium mb-3">Suggested Hashtags</h3>
            <Card className="p-3 bg-muted/30">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <p className="text-sm">
                    #{hashtags.join(' #')}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(`#${hashtags.join(' #')}`, 'hashtags')}
                >
                  {copiedStates.hashtags ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};