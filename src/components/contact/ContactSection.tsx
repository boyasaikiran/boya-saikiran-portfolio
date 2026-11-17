import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  FileText, 
  Copy, 
  Check, 
  Terminal, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { OWNER_EMAIL, GITHUB_PROFILE_URL, LINKEDIN_PROFILE_URL } from '../../data/developerActivity';
import { soundManager } from '../../audio/soundEffects';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // anti-bot spam protection
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<{
    status: 'idle' | 'prepared' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });

  const handleCopyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(OWNER_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formState.name.trim()) errs.name = 'Please provide your name.';
    if (!formState.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!formState.subject.trim()) errs.subject = 'Please enter a message subject.';
    if (!formState.message.trim() || formState.message.trim().length < 15) {
      errs.message = 'Please provide at least 15 characters describing your inquiry.';
    }
    if (formState.honeypot) {
      // Bot trapped
      errs.honeypot = 'Spam filter triggered.';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmissionFeedback({
        status: 'error',
        message: 'Please review and resolve the marked fields before proceeding.',
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Prepare direct mailto communication without fake submission simulation
    const subjectEncoded = encodeURIComponent(`[Portfolio Inquiry] ${formState.subject} - from ${formState.name}`);
    const bodyEncoded = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );
    const mailtoUrl = `mailto:${OWNER_EMAIL}?subject=${subjectEncoded}&body=${bodyEncoded}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionFeedback({
        status: 'prepared',
        message: `Direct email dispatch prepared! Opening your mail client to send to ${OWNER_EMAIL}.`,
      });
      window.location.href = mailtoUrl;
    }, 400);
  };

  const handleDownloadResume = () => {
    soundManager.playClick();
    // Opens or downloads verified profile information
    window.open(LINKEDIN_PROFILE_URL, '_blank');
  };

  return (
    <section id="contact" className="relative py-28 bg-[#0D1018] border-t border-[#272D3A]/60 overflow-hidden">
      
      {/* Background Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#E32636]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121621] border border-[#272D3A] text-xs font-mono text-[#FF3548] mb-3">
            <Terminal size={13} />
            <span>COMMUNICATION TRANSMITTER</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            THE NEXT CHAPTER <span className="text-[#FF3548]">STARTS HERE.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#C6CBD5] italic mb-4 font-light">
            &ldquo;Have a problem worth solving? Let&apos;s build something intelligent.&rdquo;
          </p>

          <p className="text-sm text-[#8D94A3] max-w-xl mx-auto leading-relaxed">
            Open to engineering internships, computer vision research collaborations, and software engineering opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Channels & Verified Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Verified Email Card */}
            <div className="bg-[#121621] border border-[#272D3A] rounded-2xl p-6 relative">
              <div className="text-xs font-mono text-[#8D94A3] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Mail size={14} className="text-[#FF3548]" />
                <span>Verified Direct Email</span>
              </div>

              <div className="text-sm sm:text-base font-bold text-white font-mono break-all mb-4">
                {OWNER_EMAIL}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#07080C] border border-[#272D3A] hover:border-[#FF3548] text-xs font-mono text-[#F5F6F8] transition-colors"
                >
                  {copiedEmail ? <Check size={14} className="text-[#75E5ED]" /> : <Copy size={14} />}
                  <span>{copiedEmail ? 'Copied to Clipboard' : 'Copy Address'}</span>
                </button>

                <a
                  href={`mailto:${OWNER_EMAIL}`}
                  onClick={() => soundManager.playClick()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E32636]/15 border border-[#E32636]/40 hover:bg-[#E32636] text-xs font-mono text-[#FF3548] hover:text-white transition-colors"
                >
                  <Send size={13} />
                  <span>Launch Mail</span>
                </a>
              </div>
            </div>

            {/* Social & Professional Networks */}
            <div className="bg-[#121621] border border-[#272D3A] rounded-2xl p-6 space-y-3">
              <div className="text-xs font-mono text-[#8D94A3] uppercase tracking-wider mb-3">
                Professional Networks
              </div>

              <a
                href={LINKEDIN_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="p-3 rounded-xl bg-[#07080C] border border-[#272D3A] hover:border-[#75E5ED] flex items-center justify-between text-xs font-mono text-[#C6CBD5] hover:text-white transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon size={16} className="text-[#75E5ED]" />
                  <span>LinkedIn Profile</span>
                </div>
                <ExternalLink size={12} className="text-[#8D94A3] group-hover:text-white" />
              </a>

              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="p-3 rounded-xl bg-[#07080C] border border-[#272D3A] hover:border-[#8D94A3] flex items-center justify-between text-xs font-mono text-[#C6CBD5] hover:text-white transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon size={16} className="text-[#FF3548]" />
                  <span>GitHub Repositories</span>
                </div>
                <ExternalLink size={12} className="text-[#8D94A3] group-hover:text-white" />
              </a>

              <button
                onClick={handleDownloadResume}
                className="w-full p-3 rounded-xl bg-[#07080C] border border-[#272D3A] hover:border-[#E32636] flex items-center justify-between text-xs font-mono text-[#C6CBD5] hover:text-white transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <FileText size={16} className="text-[#FF3548]" />
                  <span>Resume &amp; Profile</span>
                </div>
                <ExternalLink size={12} className="text-[#8D94A3] group-hover:text-white" />
              </button>
            </div>

            {/* Location & Academic Base */}
            <div className="p-4 rounded-xl bg-[#07080C] border border-[#272D3A] text-xs font-mono text-[#8D94A3] space-y-1">
              <div>INSTITUTION: Karunya Institute of Technology and Sciences</div>
              <div>LOCATION: Coimbatore, Tamil Nadu, India</div>
              <div>TIMEZONE: IST (UTC +5:30)</div>
            </div>

          </div>

          {/* Right: Direct Dispatch Communication Form */}
          <div className="lg:col-span-7 bg-[#121621] border border-[#272D3A] rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-[#272D3A]/60 pb-4 mb-6">
              <span className="text-xs font-mono text-white uppercase tracking-wider flex items-center gap-2">
                <Send size={14} className="text-[#FF3548]" />
                <span>Transmit Direct Message</span>
              </span>
              <span className="text-[11px] font-mono text-[#75E5ED]">Encrypted &amp; Validated</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Honeypot hidden input for spam protection */}
              <input
                type="text"
                name="website"
                value={formState.honeypot}
                onChange={(e) => setFormState({ ...formState, honeypot: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#8D94A3] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Dr. Alex Mercer"
                    className={`w-full bg-[#07080C] border ${
                      errors.name ? 'border-[#FF3548]' : 'border-[#272D3A]'
                    } focus:border-[#FF3548] rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-[#8D94A3]/50 focus:outline-none transition-colors`}
                  />
                  {errors.name && (
                    <span className="text-[11px] font-mono text-[#FF3548] mt-1 block">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8D94A3] mb-1.5">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. alex@enterprise.com"
                    className={`w-full bg-[#07080C] border ${
                      errors.email ? 'border-[#FF3548]' : 'border-[#272D3A]'
                    } focus:border-[#FF3548] rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-[#8D94A3]/50 focus:outline-none transition-colors`}
                  />
                  {errors.email && (
                    <span className="text-[11px] font-mono text-[#FF3548] mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8D94A3] mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="e.g. Computer Vision Research Collaboration"
                  className={`w-full bg-[#07080C] border ${
                    errors.subject ? 'border-[#FF3548]' : 'border-[#272D3A]'
                  } focus:border-[#FF3548] rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-[#8D94A3]/50 focus:outline-none transition-colors`}
                />
                {errors.subject && (
                  <span className="text-[11px] font-mono text-[#FF3548] mt-1 block">
                    {errors.subject}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8D94A3] mb-1.5">
                  Message Description *
                </label>
                <textarea
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Describe your inquiry, project scope, or opportunity details (minimum 15 characters)..."
                  className={`w-full bg-[#07080C] border ${
                    errors.message ? 'border-[#FF3548]' : 'border-[#272D3A]'
                  } focus:border-[#FF3548] rounded-xl p-4 text-xs font-mono text-white placeholder-[#8D94A3]/50 focus:outline-none transition-colors resize-none`}
                />
                {errors.message && (
                  <span className="text-[11px] font-mono text-[#FF3548] mt-1 block">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Status and Feedback Messages */}
              {submissionFeedback.message && (
                <div
                  className={`p-3 rounded-lg text-xs font-mono flex items-start gap-2 ${
                    submissionFeedback.status === 'prepared'
                      ? 'bg-[#75E5ED]/10 text-[#75E5ED] border border-[#75E5ED]/30'
                      : 'bg-[#E32636]/10 text-[#FF3548] border border-[#E32636]/30'
                  }`}
                >
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>{submissionFeedback.message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#E32636] hover:bg-[#FF3548] text-white font-mono text-xs tracking-wider uppercase transition-all duration-200 shadow-[0_0_20px_rgba(227,38,54,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send size={14} />
                <span>{isSubmitting ? 'DISPATCHING...' : 'TRANSMIT TO BOYA SAIKIRAN'}</span>
              </button>

              <div className="text-[11px] font-mono text-[#8D94A3] text-center pt-2">
                * Dispatches directly to {OWNER_EMAIL} with input pre-populated.
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
