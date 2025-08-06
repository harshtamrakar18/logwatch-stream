import React, { memo, useState, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Log } from '@/types';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface LogRowProps {
  log: Log;
  style?: React.CSSProperties;
}

const LogRowComponent: React.FC<LogRowProps> = ({ log, style }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const getLevelVariant = (level: string) => {
    switch (level) {
      case 'INFO':
        return 'bg-info/20 text-info border-info/30';
      case 'WARN':
        return 'bg-warn/20 text-warn border-warn/30';
      case 'ERROR':
        return 'bg-error/20 text-error border-error/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
    } catch {
      return timestamp;
    }
  };

  return (
    <div style={style} className="px-4 py-1">
      <Card className="bg-dashboard-log-row hover:bg-dashboard-log-hover transition-colors border-border/50">
        <div
          className="flex items-center space-x-3 p-3 cursor-pointer"
          onClick={toggleExpanded}
        >
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-muted-foreground"
          >
            {isExpanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </Button>

          <div className="text-xs text-muted-foreground font-mono min-w-0 flex-shrink-0">
            {formatTimestamp(log.timestamp)}
          </div>

          <Badge
            variant="outline"
            className={`text-xs font-medium ${getLevelVariant(log.level)}`}
          >
            {log.level}
          </Badge>

          <div className="flex-1 text-sm text-foreground truncate">
            {log.message}
          </div>
        </div>

        {isExpanded && (
          <div className="px-3 pb-3">
            <div className="pt-2 border-t border-border/50">
              <div className="text-xs text-muted-foreground mb-2">Metadata:</div>
              <pre className="text-xs bg-muted/50 p-2 rounded border overflow-x-auto">
                {JSON.stringify(log.metadata, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export const LogRow = memo(LogRowComponent);