// Redirect /access → /rank-rewards
import { redirect } from '@sveltejs/kit';

export function load() {
  redirect(301, '/rank-rewards');
}
