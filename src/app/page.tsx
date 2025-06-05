import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900'>
      {/* Navigation */}
      <nav className='border-b bg-white/80 backdrop-blur-sm dark:bg-slate-950/80'>
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
          <h1 className='text-xl font-bold'>Your Name</h1>
          <div className='flex gap-4'>
            <Button variant='ghost' size='sm'>
              About
            </Button>
            <Button variant='ghost' size='sm'>
              Work
            </Button>
            <Button variant='ghost' size='sm'>
              Projects
            </Button>
            <Button variant='ghost' size='sm'>
              Contact
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='container mx-auto px-4 py-16 lg:py-24'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className='mb-6'>
            <Badge variant='secondary' className='mb-4'>
              UI/UX Designer & Frontend Developer
            </Badge>
            <h1 className='text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent'>
              Creating Digital Experiences That Matter
            </h1>
            <p className='text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto'>
              UI Designer at London Computer Systems with a passion for design
              systems, user research, and creating intuitive interfaces that
              solve real problems.
            </p>
          </div>

          <div className='flex gap-4 justify-center mb-12'>
            <Button size='lg' className='gap-2'>
              <Mail className='w-4 h-4' />
              Get in Touch
            </Button>
            <Button variant='outline' size='lg' className='gap-2'>
              <Github className='w-4 h-4' />
              View Work
            </Button>
          </div>

          {/* Skills */}
          <div className='flex flex-wrap gap-2 justify-center'>
            {[
              'UI/UX Design',
              'Design Systems',
              'Figma',
              'React',
              'TypeScript',
              'Tailwind CSS',
              'User Research',
              'Prototyping',
              'Frontend Development',
            ].map((skill) => (
              <Badge key={skill} variant='outline'>
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className='container mx-auto px-4 py-16'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold mb-12 text-center'>
            Featured Work
          </h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {/* Rent Manager Design System */}
            <Card className='group hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <Badge variant='secondary'>Current Role</Badge>
                  <ExternalLink className='w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity' />
                </div>
                <CardTitle>Rent Manager Design System</CardTitle>
                <CardDescription>
                  Design system development and documentation for property
                  management software
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-slate-600 dark:text-slate-300 mb-4'>
                  Leading the creation of a comprehensive design system with
                  reusable components, documentation, and guidelines for
                  consistent user experiences.
                </p>
                <div className='flex flex-wrap gap-1'>
                  <Badge variant='outline' className='text-xs'>
                    Figma
                  </Badge>
                  <Badge variant='outline' className='text-xs'>
                    Design Systems
                  </Badge>
                  <Badge variant='outline' className='text-xs'>
                    Documentation
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Stylebin */}
            <Card className='group hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <Badge variant='secondary'>Capstone Project</Badge>
                  <ExternalLink className='w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity' />
                </div>
                <CardTitle>Stylebin</CardTitle>
                <CardDescription>
                  Web interface for creating and styling React components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-slate-600 dark:text-slate-300 mb-4'>
                  Collaborative capstone project targeting hobby developers with
                  an intuitive interface for creating, maintaining, and
                  exporting styled React components.
                </p>
                <div className='flex flex-wrap gap-1'>
                  <Badge variant='outline' className='text-xs'>
                    React
                  </Badge>
                  <Badge variant='outline' className='text-xs'>
                    UI/UX
                  </Badge>
                  <Badge variant='outline' className='text-xs'>
                    Team Project
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Flora Material Design */}
            <Card className='group hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <Badge variant='secondary'>Case Study</Badge>
                  <ExternalLink className='w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity' />
                </div>
                <CardTitle>Flora - Material Design 3</CardTitle>
                <CardDescription>
                  Dynamic theming with Material Design 3 tokens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-slate-600 dark:text-slate-300 mb-4'>
                  Webstore prototype utilizing Material Design 3 tokens for
                  dynamic styling and user-centric theming preferences.
                </p>
                <div className='flex flex-wrap gap-1'>
                  <Badge variant='outline' className='text-xs'>
                    Material Design
                  </Badge>
                  <Badge variant='outline' className='text-xs'>
                    Design Tokens
                  </Badge>
                  <Badge variant='outline' className='text-xs'>
                    Prototyping
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Highlights */}
      <section className='container mx-auto px-4 py-16 bg-slate-50 dark:bg-slate-900/50'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold mb-12 text-center'>
            Experience Highlights
          </h2>
          <div className='space-y-8'>
            <div className='flex gap-4'>
              <div className='flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center'>
                <div className='w-6 h-6 bg-blue-600 rounded-sm'></div>
              </div>
              <div>
                <h3 className='font-semibold mb-1'>
                  UI Designer at London Computer Systems
                </h3>
                <p className='text-slate-600 dark:text-slate-300 text-sm mb-2'>
                  Aug 2023 – Present
                </p>
                <p className='text-sm'>
                  Leading design system development, conducting user research,
                  and creating high-fidelity designs for Rent Manager software
                  platform.
                </p>
              </div>
            </div>

            <Separator />

            <div className='flex gap-4'>
              <div className='flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center'>
                <div className='w-6 h-6 bg-green-600 rounded-sm'></div>
              </div>
              <div>
                <h3 className='font-semibold mb-1'>
                  Product Designer at SupplyHive
                </h3>
                <p className='text-slate-600 dark:text-slate-300 text-sm mb-2'>
                  May 2022 – Mar 2023
                </p>
                <p className='text-sm'>
                  Led design efforts for web application, working directly with
                  clients and developing reusable UI components for the design
                  system.
                </p>
              </div>
            </div>

            <Separator />

            <div className='flex gap-4'>
              <div className='flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center'>
                <div className='w-6 h-6 bg-purple-600 rounded-sm'></div>
              </div>
              <div>
                <h3 className='font-semibold mb-1'>
                  Product Development Engineer at Refract Labs
                </h3>
                <p className='text-slate-600 dark:text-slate-300 text-sm mb-2'>
                  Sep 2020 – Apr 2022
                </p>
                <p className='text-sm'>
                  Managed full product development lifecycle from user research
                  through design and prototyping for web-based solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t bg-white dark:bg-slate-950'>
        <div className='container mx-auto px-4 py-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <div className='text-sm text-slate-600 dark:text-slate-300'>
              © 2024 Your Name. All rights reserved.
            </div>
            <div className='flex gap-4'>
              <Button variant='ghost' size='sm'>
                <Github className='w-4 h-4' />
              </Button>
              <Button variant='ghost' size='sm'>
                <Linkedin className='w-4 h-4' />
              </Button>
              <Button variant='ghost' size='sm'>
                <Mail className='w-4 h-4' />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
