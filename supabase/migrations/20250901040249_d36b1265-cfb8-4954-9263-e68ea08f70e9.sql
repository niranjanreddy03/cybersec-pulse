-- Drop the overly permissive policy that allows any authenticated user to view contact messages
DROP POLICY IF EXISTS "Authenticated users can view contact messages" ON public.contact_messages;

-- Create a new policy that only allows admins to view contact messages
CREATE POLICY "Only admins can view contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));