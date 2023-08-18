type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      type="submit"
      className="flex h-14 items-center justify-center bg-purple-500 text-sm font-bold uppercase outline-2 outline-transparent transition-colors hover:bg-purple-600 focus:outline-white disabled:cursor-not-allowed disabled:bg-purple-600"
    >
      {children}
    </button>
  )
}
