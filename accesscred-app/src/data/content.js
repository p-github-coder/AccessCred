// Static learning content and micro-task definitions (not opportunity data).
export const TASKS = [
  { id: 'seam', title: 'Straight Seam Sewing Sample', skill: 'Tailoring', icon: 'scissors', desc: 'Sew a straight seam on the provided fabric. Ensure the seam is neat and even.', submit: '3–6 clear photos of your work. Optional: a short voice or video note (max 1 min).' },
  { id: 'joint', title: 'Basic Wood Joint', skill: 'Carpentry', icon: 'tool', desc: 'Cut and join two pieces of wood with a tight, square joint.', submit: '3–6 clear photos showing the joint from several angles. Optional: a short walkthrough note.' },
  { id: 'card', title: 'Responsive Profile Card', skill: 'Web development', icon: 'code', desc: 'Build a responsive profile card with HTML and CSS that works on phone and desktop.', submit: '3–6 screenshots (phone and desktop) plus optional short screen recording.' },
]
export const COURSES = {
  Courses: [
    { t: 'React for Beginners', d: 'Learn the basics of React and build your first project.', r: '4.8 (2.4k)', c: '#2B7BE4' },
    { t: 'Python for Everybody', d: 'A beginner-friendly intro to Python programming.', r: '4.7 (1.8k)', c: '#7C4DDB' },
    { t: 'Fashion Design Basics', d: 'Pattern drafting, measuring and finishing techniques.', r: '4.6 (960)', c: '#F97B5A' },
    { t: 'Carpentry Fundamentals', d: 'Tools, joints and safe workshop practice.', r: '4.5 (720)', c: '#1E9E6A' },
  ],
  Guides: [
    { t: 'Write a Winning CV', d: 'Step-by-step guide with a template you can copy.', r: 'Guide', c: '#0D3560' },
    { t: 'Scholarship Essay Playbook', d: 'Structure, tone and common mistakes to avoid.', r: 'Guide', c: '#F97B5A' },
    { t: 'Photograph Your Work', d: 'Take clear, trustworthy photos for skill verification.', r: 'Guide', c: '#1E9E6A' },
  ],
  Webinars: [
    { t: 'Ask a Hiring Manager', d: 'Live Q&A on what recruiters look for in young talent.', r: 'Live', c: '#7C4DDB' },
    { t: 'From Trade to Brand', d: 'How tailors and carpenters find steady clients online.', r: 'Live', c: '#2B7BE4' },
  ],
}
export const SKILL_HINTS = { Formal: ['Python', 'React', 'SQL', 'JavaScript', 'Data Analysis', 'Communication'], Informal: ['Tailoring', 'Pattern Cutting', 'Carpentry', 'Measuring', 'Finishing', 'Customer Service'] }
