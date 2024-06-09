'use server'
 
import { RedirectType, redirect } from 'next/navigation'
 
export async function navigate(path : string) {
  redirect(path, RedirectType.replace)
}
