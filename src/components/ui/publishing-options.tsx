import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Label } from './label';
import { Switch } from './switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Input } from './input';
import { Badge } from './badge';
import { Calendar, Clock, Eye, Star } from 'lucide-react';

interface PublishingOptionsProps {
  status: 'draft' | 'published' | 'scheduled';
  featured: boolean;
  publishDate?: string;
  visibility: 'public' | 'private' | 'password';
  password?: string;
  onStatusChange: (status: 'draft' | 'published' | 'scheduled') => void;
  onFeaturedChange: (featured: boolean) => void;
  onPublishDateChange: (date: string) => void;
  onVisibilityChange: (visibility: 'public' | 'private' | 'password') => void;
  onPasswordChange: (password: string) => void;
}

export function PublishingOptions({
  status,
  featured,
  publishDate,
  visibility,
  password,
  onStatusChange,
  onFeaturedChange,
  onPublishDateChange,
  onVisibilityChange,
  onPasswordChange
}: PublishingOptionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Publishing Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="status">Publishing Status</Label>
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Draft</Badge>
                  <span>Save as draft</span>
                </div>
              </SelectItem>
              <SelectItem value="published">
                <div className="flex items-center gap-2">
                  <Badge variant="default">Published</Badge>
                  <span>Publish immediately</span>
                </div>
              </SelectItem>
              <SelectItem value="scheduled">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    <Clock className="h-3 w-3 mr-1" />
                    Scheduled
                  </Badge>
                  <span>Schedule for later</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {status === 'scheduled' && (
          <div>
            <Label htmlFor="publish-date">Publish Date & Time</Label>
            <Input
              id="publish-date"
              type="datetime-local"
              value={publishDate}
              onChange={(e) => onPublishDateChange(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>
        )}

        <div>
          <Label htmlFor="visibility">Visibility</Label>
          <Select value={visibility} onValueChange={onVisibilityChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>Public</span>
                </div>
              </SelectItem>
              <SelectItem value="private">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 opacity-50" />
                  <span>Private</span>
                </div>
              </SelectItem>
              <SelectItem value="password">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>Password Protected</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {visibility === 'password' && (
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              placeholder="Enter password for this post"
            />
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={featured}
            onCheckedChange={onFeaturedChange}
          />
          <Label htmlFor="featured" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Featured Article
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}