export default function PageBackground() {
  return (
    <div className="fixed inset-0 -z-10 mesh-bg noise-overlay">
      <div className="absolute inset-0 grid-lines opacity-60" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse-ring" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-float-slow" />
    </div>
  )
}
