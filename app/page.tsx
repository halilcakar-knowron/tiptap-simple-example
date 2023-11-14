'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tiptap, proseClasses } from '@/components/tiptap';

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Hey the title is not long enough' })
    .max(50, { message: 'This is toooooo long' }),
  description: z
    .string()
    .min(5, { message: 'Hey, what is this??' })
    .max(5000, { message: 'Wow, do you want to create your blog here?' }),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
    },
  });

  return (
    <main className="p-24 container">
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Main title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <div className="mt-2">
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Tiptap
                      description={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>

                <div
                  className={'mt-20  container ' + proseClasses}
                  dangerouslySetInnerHTML={{ __html: field.value }}
                />
              </div>
            )}
          />

          <Button className="mt-4" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
