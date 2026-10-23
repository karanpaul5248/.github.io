<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { site, isFormConfigured } from '@/data/site'

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured'

const configured = isFormConfigured()
const status = ref<Status>('idle')
const statusMessage = ref('')

const form = reactive({
  name: '', email: '', phone: '', type: '', date: '', location: '', budget: '', message: '', gotcha: ''
})
const errors = reactive<Record<string, string>>({})

const projectTypes = [
  'Wedding — Photography', 'Wedding — Videography', 'Wedding — Photography + Videography',
  'Complete Wedding Package (with drone)', 'Anand Karaj / Punjabi Wedding', 'Pre-wedding Shoot',
  'Cinematic Music Video', 'Birthday / Private Event', 'Destination Wedding',
  'Travel Film', 'Commercial / Promotional', 'Other / Custom Project'
]
const budgets = ['Under $1,500 CAD', '$1,500 – $2,500 CAD', '$2,500 – $3,500 CAD', 'Over $3,500 CAD', 'Not sure yet']

function validate(): boolean {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!form.name.trim()) errors.name = 'Please enter your full name.'
  if (!form.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'That email address does not look complete.'
  if (!form.type) errors.type = 'Please choose an event or project type.'
  if (!form.message.trim()) errors.message = 'Please add a few details about your project.'
  else if (form.message.trim().length < 10) errors.message = 'A little more detail helps — at least a short sentence.'
  return Object.keys(errors).length === 0
}

const mailtoHref = computed(() => {
  const subject = encodeURIComponent(`Website enquiry — ${form.type || 'New project'} — ${form.name || ''}`)
  const body = encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nProject type: ${form.type}\nDate: ${form.date}\nLocation: ${form.location}\nEstimated budget: ${form.budget}\n\n${form.message}`)
  return `mailto:${site.email}?subject=${subject}&body=${body}`
})

async function submit() {
  if (status.value === 'submitting') return
  if (!validate()) {
    statusMessage.value = 'Please fix the highlighted fields and try again.'
    status.value = 'error'
    return
  }
  if (form.gotcha) return // honeypot: silently stop bots
  if (!configured) {
    status.value = 'unconfigured'
    statusMessage.value = 'This form is not connected to an email service yet, so nothing was sent. Please use the email button below — it opens your email app with your details already filled in.'
    return
  }
  status.value = 'submitting'
  statusMessage.value = ''
  try {
    const res = await fetch(site.formspreeEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: form.name, email: form.email, phone: form.phone, project_type: form.type,
        event_date: form.date, location: form.location, budget: form.budget, message: form.message,
        _subject: `New Karan Kreation enquiry — ${form.type}`
      })
    })
    if (res.ok) {
      status.value = 'success'
      statusMessage.value = 'Thank you — your enquiry has been sent. You will receive a reply at the email address you provided.'
      Object.assign(form, { name: '', email: '', phone: '', type: '', date: '', location: '', budget: '', message: '' })
    } else {
      const data = await res.json().catch(() => null) as { errors?: Array<{ message: string }> } | null
      throw new Error(data?.errors?.map(e => e.message).join(', ') || `Submission failed (${res.status})`)
    }
  } catch (err) {
    status.value = 'error'
    statusMessage.value = `Something went wrong and your enquiry was not sent. Please try again, or email directly at ${site.email}. ${err instanceof Error ? '' : ''}`
  }
}
</script>
<template>
  <div>
    <div v-if="!configured" class="notice" role="note">
      <strong>Form not connected yet.</strong>
      <span>This website form still needs its one-time Formspree setup (see INSTRUCTIONS_v5.txt, section 11). Until then, nothing submitted here can be delivered — please email
      <a :href="`mailto:${site.email}`">{{ site.email }}</a> directly, or use the email button under the form.</span>
    </div>

    <form class="form" novalidate @submit.prevent="submit">
      <div class="row">
        <div class="field">
          <label for="cf-name">Full name <span aria-hidden="true">*</span></label>
          <input id="cf-name" v-model="form.name" name="name" autocomplete="name" :aria-invalid="!!errors.name" :aria-describedby="errors.name ? 'e-name' : undefined" placeholder="Your full name" />
          <p v-if="errors.name" id="e-name" class="err">{{ errors.name }}</p>
        </div>
        <div class="field">
          <label for="cf-email">Email address <span aria-hidden="true">*</span></label>
          <input id="cf-email" v-model="form.email" type="email" name="email" autocomplete="email" :aria-invalid="!!errors.email" :aria-describedby="errors.email ? 'e-email' : undefined" placeholder="you@example.com" />
          <p v-if="errors.email" id="e-email" class="err">{{ errors.email }}</p>
        </div>
      </div>
      <div class="row">
        <div class="field">
          <label for="cf-phone">Phone number <span class="opt">(optional)</span></label>
          <input id="cf-phone" v-model="form.phone" type="tel" name="phone" autocomplete="tel" placeholder="+1 ..." />
        </div>
        <div class="field">
          <label for="cf-type">Event or project type <span aria-hidden="true">*</span></label>
          <select id="cf-type" v-model="form.type" :aria-invalid="!!errors.type" :aria-describedby="errors.type ? 'e-type' : undefined">
            <option value="">Choose one…</option>
            <option v-for="t in projectTypes" :key="t" :value="t">{{ t }}</option>
          </select>
          <p v-if="errors.type" id="e-type" class="err">{{ errors.type }}</p>
        </div>
      </div>
      <div class="row">
        <div class="field">
          <label for="cf-date">Event date <span class="opt">(optional)</span></label>
          <input id="cf-date" v-model="form.date" type="date" name="date" />
        </div>
        <div class="field">
          <label for="cf-location">Event location <span class="opt">(optional)</span></label>
          <input id="cf-location" v-model="form.location" name="location" placeholder="City, province or country" />
        </div>
      </div>
      <div class="field">
        <label for="cf-budget">Estimated budget <span class="opt">(optional)</span></label>
        <select id="cf-budget" v-model="form.budget">
          <option value="">Prefer not to say</option>
          <option v-for="b in budgets" :key="b" :value="b">{{ b }}</option>
        </select>
      </div>
      <div class="field">
        <label for="cf-message">Message <span aria-hidden="true">*</span></label>
        <textarea id="cf-message" v-model="form.message" rows="6" :aria-invalid="!!errors.message" :aria-describedby="errors.message ? 'e-message' : undefined" placeholder="Tell me about the day, the venue, the timing, and anything that matters to you…" />
        <p v-if="errors.message" id="e-message" class="err">{{ errors.message }}</p>
      </div>
      <!-- Honeypot: hidden from people, tempting to bots -->
      <div class="hp" aria-hidden="true">
        <label>Leave this empty<input v-model="form.gotcha" type="text" name="_gotcha" tabindex="-1" autocomplete="off" /></label>
      </div>

      <div class="actions">
        <button class="submit" type="submit" :disabled="status === 'submitting'">
          {{ status === 'submitting' ? 'Sending…' : 'Send enquiry' }} <span aria-hidden="true">↗</span>
        </button>
        <a class="mail-btn" :href="mailtoHref">Email instead — {{ site.email }}</a>
      </div>

      <p v-if="statusMessage" class="status" :class="status" role="status" aria-live="polite">{{ statusMessage }}</p>
      <p class="privacy">Your details are used only to reply to this enquiry. Fields marked * are required; everything else is optional.</p>
    </form>
  </div>
</template>
<style scoped lang="scss">
.notice { border: 1px solid rgba(232,138,138,.45); background: rgba(163,38,56,.12); padding: 18px 20px; border-radius: var(--radius); margin-bottom: 26px; display: flex; flex-direction: column; gap: 6px; font-size: .94rem; a { color: #fff; } }
.form { display: flex; flex-direction: column; gap: 20px; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.field { display: flex; flex-direction: column; gap: 8px; label { font-weight: 700; font-size: .9rem; .opt { color: var(--muted); font-weight: 500; } }
  input, select, textarea {
    background: var(--bg-2); border: 1px solid var(--line); border-radius: var(--radius);
    padding: 13px 14px; color: var(--ink); width: 100%;
    &::placeholder { color: #6f665a; }
    &[aria-invalid="true"] { border-color: var(--error); }
    &:focus { border-color: var(--ink-2); outline: none; box-shadow: 0 0 0 2px var(--accent-soft); }
  }
  select option { background: #171410; }
}
.err { color: var(--error); font-size: .86rem; }
.hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
.actions { display: flex; gap: 16px; flex-wrap: wrap; align-items: center; margin-top: 4px; }
.submit {
  background: var(--accent); color: #fff; border: 0; border-radius: 999px; padding: 15px 28px;
  font-weight: 700; cursor: pointer; transition: all .25s;
  &:hover:not(:disabled) { background: var(--accent-deep); transform: translateY(-1px); }
  &:disabled { opacity: .6; cursor: wait; }
}
.mail-btn { color: var(--ink-2); font-size: .92rem; font-weight: 600; &:hover { color: #fff; } }
.status { padding: 14px 16px; border-radius: var(--radius); font-size: .94rem;
  &.success { background: rgba(80,140,90,.18); border: 1px solid rgba(159,211,168,.4); }
  &.error, &.unconfigured { background: rgba(163,38,56,.14); border: 1px solid rgba(232,138,138,.4); }
}
.privacy { color: var(--muted); font-size: .85rem; }
@media (max-width: 640px) { .row { grid-template-columns: 1fr; } }
</style>
