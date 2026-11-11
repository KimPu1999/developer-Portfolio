import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { PageMeta } from '../components/ui/PageMeta'

export function NotFoundPage() { return <main><PageMeta title="Page not found | Portfolio" description="The requested portfolio page could not be found." /><Container className="flex min-h-[60vh] flex-col items-start justify-center"><p className="font-mono text-sm text-cyan-500">404 / not found</p><h1 className="mt-4 text-5xl font-semibold text-slate-950 dark:text-white">That page took a wrong turn.</h1><p className="mt-5 max-w-lg text-slate-600 dark:text-slate-400">The page you are looking for does not exist or has moved.</p><Button to="/" className="mt-8">Back home</Button></Container></main> }
