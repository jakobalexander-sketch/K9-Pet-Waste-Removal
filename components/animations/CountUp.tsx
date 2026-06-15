'use client'

import { useInView, useMotionValue, useSpring, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

type Props = {
  to: number
  suffix?: string
  prefix?: string
  duration?: number
}

export default function CountUp({ to, suffix = '', prefix = '', duration = 2 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const value = useMotionValue(0)
  const spring = useSpring(value, { duration: duration * 1000, bounce: 0 })

  useEffect(() => {
    if (inView) value.set(to)
  }, [inView, to, value])

  useEffect(() => {
    return spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = prefix + Math.round(v).toLocaleString() + suffix
    })
  }, [spring, prefix, suffix])

  return <span ref={ref}>{prefix}0{suffix}</span>
}
