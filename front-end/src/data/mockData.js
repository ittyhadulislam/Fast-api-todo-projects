export const INITIAL_MEMBERS = [
  {
    id: 'user-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@company.io',
    role: 'Product Lead',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    initials: 'SJ',
    color: 'bg-emerald-600',
  },
  {
    id: 'user-2',
    name: 'Alex Chen',
    email: 'alex.chen@company.io',
    role: 'Senior UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    initials: 'AC',
    color: 'bg-blue-600',
  },
  {
    id: 'user-3',
    name: 'Maya Patel',
    email: 'maya.patel@company.io',
    role: 'Frontend Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    initials: 'MP',
    color: 'bg-purple-600',
  },
  {
    id: 'user-4',
    name: 'Liam Vance',
    email: 'liam.vance@company.io',
    role: 'Full-Stack Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    initials: 'LV',
    color: 'bg-amber-600',
  },
  {
    id: 'user-5',
    name: 'Sofia Rodriguez',
    email: 'sofia.r@company.io',
    role: 'QA Specialist',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    initials: 'SR',
    color: 'bg-rose-600',
  },
];

export const INITIAL_TASKS = [
  {
    id: 'task-101',
    title: 'Finalize mobile layout & touch target ergonomics',
    description: 'Ensure touch targets exceed 44px on smaller screens and mobile navigation drawer functions smoothly.',
    priority: 'urgent', // urgent, high, medium, low
    status: 'in_progress', // todo, in_progress, completed
    assignedToId: 'user-3', // Maya Patel
    dueDate: '2026-10-15',
    category: 'Design & UX',
    createdAt: '2026-10-08T10:00:00Z',
    createdBy: 'Sarah Jenkins',
  },
  {
    id: 'task-102',
    title: 'Review team priority matrix & sprint deliverable allocations',
    description: 'Align cross-functional goals for sprint 14 with product and design leads.',
    priority: 'high',
    status: 'in_progress',
    assignedToId: 'user-2', // Alex Chen
    dueDate: '2026-10-14',
    category: 'Planning',
    createdAt: '2026-10-09T08:15:00Z',
    createdBy: 'Sarah Jenkins',
  },
  {
    id: 'task-103',
    title: 'Audit WCAG AA color contrast on priority labels',
    description: 'Verify 4.5:1 text contrast for all priority badges and make sure status colors are accompanied by text.',
    priority: 'high',
    status: 'todo',
    assignedToId: 'user-5', // Sofia Rodriguez
    dueDate: '2026-10-16',
    category: 'Accessibility',
    createdAt: '2026-10-09T11:20:00Z',
    createdBy: 'Alex Chen',
  },
  {
    id: 'task-104',
    title: 'Implement user login and account registration interface',
    description: 'Clean responsive modal with form fields, quick demo profile switches, and session status display.',
    priority: 'medium',
    status: 'completed',
    assignedToId: 'user-4', // Liam Vance
    dueDate: '2026-10-10',
    category: 'Authentication',
    createdAt: '2026-10-07T09:00:00Z',
    createdBy: 'Sarah Jenkins',
  },
  {
    id: 'task-105',
    title: 'Prepare quarterly engineering architecture review',
    description: 'Draft slide deck covering performance benchmarks, bundle size savings, and frontend standards.',
    priority: 'low',
    status: 'todo',
    assignedToId: 'user-1', // Sarah Jenkins
    dueDate: '2026-10-20',
    category: 'Roadmap',
    createdAt: '2026-10-10T11:00:00Z',
    createdBy: 'Sarah Jenkins',
  },
  {
    id: 'task-106',
    title: 'Refactor Tailwind CSS utility styles and typography',
    description: 'Eliminate nested cards, adopt clean hairline dividers, and unify tabular numeral alignment.',
    priority: 'medium',
    status: 'completed',
    assignedToId: 'user-2', // Alex Chen
    dueDate: '2026-10-09',
    category: 'Refactoring',
    createdAt: '2026-10-06T14:10:00Z',
    createdBy: 'Maya Patel',
  },
];
