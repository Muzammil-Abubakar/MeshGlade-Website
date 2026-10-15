"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, RotateCcw } from "lucide-react";
import { agentScenarios } from "@/content/landing";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

type Msg = { from: "agent" | "user"; text: string; id: number };

/** Scripted, interactive WhatsApp-style agent demo. No API calls, no cost. */
export function AgentDemo() {
  const [scenarioId, setScenarioId] = useState(agentScenarios[0].id);
  const scenario = agentScenarios.find((s) => s.id === scenarioId)!;
  const [messages, setMessages] = useState<Msg[]>([]);
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const [event, setEvent] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const idRef = useRef(0);
  const startedRef = useRef(false);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const agentSay = (sc: (typeof agentScenarios)[number], stepIndex: number, delay = 900) => {
    const s = sc.steps[stepIndex];
    setTyping(true);
    timers.current.push(
      window.setTimeout(() => {
        setTyping(false);
        setMessages((m) => [...m, { from: "agent", text: s.agent, id: idRef.current++ }]);
        setStep(stepIndex);
        if (s.event) timers.current.push(window.setTimeout(() => setEvent(s.event!), 500));
      }, delay),
    );
  };

  /** (Re)start a conversation — called from events, never from render/effects. */
  const begin = (sc: (typeof agentScenarios)[number]) => {
    startedRef.current = true;
    clearTimers();
    setMessages([]);
    setEvent(null);
    setStep(0);
    agentSay(sc, 0, 600);
  };
  const reset = () => begin(scenario);
  const pickScenario = (id: string) => {
    setScenarioId(id);
    begin(agentScenarios.find((s) => s.id === id)!);
  };

  // Start the first conversation when the demo scrolls into view
  const beginRef = useRef(begin);
  useEffect(() => {
    beginRef.current = begin;
  });
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          if (!startedRef.current) beginRef.current(agentScenarios[0]);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimers();
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing, event]);

  const choose = (opt: string) => {
    setMessages((m) => [...m, { from: "user", text: opt, id: idRef.current++ }]);
    if (step + 1 < scenario.steps.length) agentSay(scenario, step + 1, 1100);
  };

  const current = scenario.steps[step];
  const done = !!event;
  const canChoose = !typing && messages.length > 0 && messages[messages.length - 1].from === "agent" && current?.options;

  return (
    <div ref={rootRef} className="grid h-full w-full gap-8 lg:grid-cols-12 lg:items-center lg:gap-12 xl:gap-16 min-h-0">
      <div className="flex flex-col justify-center min-h-0 lg:col-span-6 lg:py-2">
        <p className="label flex items-center gap-3 text-ivory/60">
          <span className="text-ember-60">03</span>
          <span aria-hidden className="h-px w-8 bg-ivory/30" />
          Try it yourself
        </p>
        <h2 className="display-m mt-3 sm:mt-4 lg:mt-3">
          Talk to an AI agent
          <br />
          <span className="text-ivory/50">we built.</span>
        </h2>
        <p className="mt-3 mb-6 max-w-md text-ivory/70 sm:text-lg lg:mb-5">
          Seeing beats reading. Pick a scenario and play the customer — this is what your leads would experience at 2
          a.m. on a Sunday.
        </p>
        <div role="tablist" aria-label="Demo scenario" className="grid w-full grid-cols-3 rounded-full border border-ivory/15 p-1 sm:inline-grid sm:w-auto">
          {agentScenarios.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={s.id === scenarioId}
              onClick={() => pickScenario(s.id)}
              className={cn(
                "rounded-full px-2 py-2 text-[11px] leading-tight font-semibold transition-colors duration-300 sm:px-4 sm:text-sm sm:whitespace-nowrap",
                s.id === scenarioId ? "bg-ivory text-charcoal" : "text-ivory/70 hover:text-ivory",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <ul className="mt-6 space-y-3 lg:mt-5 sm:space-y-3.5">
          {[
            ["Replies in seconds, 24/7", "No lead waits until Monday morning."],
            ["Qualifies like your best rep", "Asks the right questions, scores every lead."],
            ["Books, syncs, hands off", "Calendar, CRM and a human when it matters."],
          ].map(([t, d], i) => (
            <li key={t} className="flex gap-4">
              <span className="label mt-1 text-ember-60">0{i + 1}</span>
              <span>
                <span className="block font-display text-lg tracking-tight sm:text-xl">{t}</span>
                <span className="text-sm text-ivory/60">{d}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-7">
          <Button href="/contact?service=ai-automation&intent=audit" variant="light" size="lg">
            Get this for my business
          </Button>
          <span className="text-xs text-ivory/50 sm:text-sm">Interactive demo · scripted for illustration</span>
        </div>
      </div>

      {/* Phone */}
      <div className="flex h-full w-full items-center justify-center min-h-0 lg:col-span-6">
        <div className="relative mx-auto flex h-[580px] sm:h-[640px] lg:h-full lg:max-h-[calc(100svh-4rem)] w-full max-w-[390px] sm:max-w-[410px] flex-col min-h-0">
          <div aria-hidden className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-ember/30 blur-3xl" />
          <div className="flex h-full w-full flex-col overflow-hidden rounded-[44px] border-[10px] border-charcoal-deep bg-[#efe7d6] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)] ring-1 ring-ivory/10 min-h-0">
            {/* header */}
            <div className="shrink-0 flex items-center gap-3 bg-charcoal px-4 pt-5 pb-3 text-ivory">
              <span className="grid size-10 place-items-center rounded-full bg-ember">
                <LogoMark tone="ivory" className="w-6" />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-semibold">{scenario.business}</span>
                <span className="block text-xs text-ivory/60">{typing ? "typing…" : "AI assistant · online"}</span>
              </span>
              <button
                type="button"
                onClick={reset}
                aria-label="Restart demo"
                className="grid size-9 place-items-center rounded-full text-ivory/70 hover:bg-ivory/10"
              >
                <RotateCcw className="size-4" />
              </button>
            </div>

            {/* messages */}
            <div
              ref={scrollRef}
              data-lenis-prevent
              className="scrollbar-none flex-1 min-h-0 space-y-2 overflow-y-auto px-3 py-4"
              aria-live="polite"
            >
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}
                  >
                    <p
                      className={cn(
                        "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[0.9rem] leading-snug shadow-sm",
                        m.from === "user"
                          ? "rounded-br-md bg-charcoal text-ivory"
                          : "rounded-bl-md bg-white text-charcoal",
                      )}
                    >
                      {m.text}
                    </p>
                  </motion.div>
                ))}
                {typing && (
                  <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex">
                    <span className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3.5 shadow-sm">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="size-1.5 animate-bounce rounded-full bg-charcoal/50"
                          style={{ animationDelay: `${i * 120}ms` }}
                        />
                      ))}
                    </span>
                  </motion.div>
                )}
                {event && (
                  <motion.div
                    key="event"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center pt-2"
                  >
                    <span className="inline-flex items-center gap-2 rounded-full bg-ember px-3.5 py-2 text-xs font-semibold text-ivory">
                      <Check className="size-3.5" /> {event}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* reply chips */}
            <div className="shrink-0 min-h-[88px] border-t border-charcoal/10 bg-[#f7f1e3] px-3 py-3">
              {canChoose ? (
                <div className="flex flex-wrap gap-2">
                  {current.options!.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => choose(o)}
                      className="rounded-full border border-charcoal/20 bg-white px-3.5 py-2 text-sm font-medium text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-ivory"
                    >
                      {o}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="px-1 pt-2 text-sm text-charcoal/50">
                  {done ? "Conversation complete — tap ↻ to replay." : "Tap a reply when it appears…"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
