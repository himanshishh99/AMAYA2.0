import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";

type RiskLevel = "Low" | "Moderate" | "High" | "Emergency";

interface RiskCard {
  level: RiskLevel;
  summary: string;
  recommendation: string;
  confidence: number;
}

interface Message {
  role: "user" | "bot";
  text: string;
  riskCard?: RiskCard;
}

const riskStyles: Record<RiskLevel, string> = {
  Low: "status-low",
  Moderate: "status-moderate",
  High: "status-high",
  Emergency: "status-emergency",
};

const mockResponses: Record<string, RiskCard> = {
  headache: {
    level: "Low",
    summary: "Tension-type headache likely",
    recommendation: "Rest, hydration, OTC pain relief. Monitor for 24h.",
    confidence: 87,
  },
  chest: {
    level: "High",
    summary: "Potential cardiac event indicator",
    recommendation: "Immediate ECG recommended. Escalate to cardiology.",
    confidence: 72,
  },
  breathing: {
    level: "Emergency",
    summary: "Acute respiratory distress",
    recommendation: "Immediate emergency intervention required. Call 911.",
    confidence: 94,
  },
  default: {
    level: "Moderate",
    summary: "Symptom requires clinical evaluation",
    recommendation: "Schedule appointment within 48h. Monitor vitals.",
    confidence: 65,
  },
};

function getRiskCard(text: string): RiskCard {
  const lower = text.toLowerCase();
  if (lower.includes("headache")) return mockResponses.headache;
  if (lower.includes("chest")) return mockResponses.chest;
  if (lower.includes("breath") || lower.includes("breathing")) return mockResponses.breathing;
  return mockResponses.default;
}

export default function MedBot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hello! I'm MedBot AI. Describe your symptoms and I'll provide a structured risk assessment." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input };
    const riskCard = getRiskCard(input);
    const botMsg: Message = {
      role: "bot",
      text: "Assessment complete.",
      riskCard,
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="space-y-4 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">MedBot AI</h1>
        <p className="text-sm text-muted-foreground mt-1">Symptom triage with structured risk classification</p>
      </div>

      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="space-y-4 max-h-[500px] overflow-y-auto mb-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                {msg.role === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div className={`max-w-[80%] space-y-2 ${msg.role === "user" ? "text-right" : ""}`}>
                  <div
                    className={`inline-block px-4 py-2 rounded-xl text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.riskCard && (
                    <Card className="border shadow-sm">
                      <CardHeader className="p-3 pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-display">Risk Assessment</CardTitle>
                          <Badge className={`text-xs font-medium px-2 py-0.5 ${riskStyles[msg.riskCard.level]}`}>
                            {msg.riskCard.level}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3 pt-0 space-y-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Summary</p>
                          <p className="text-sm text-foreground">{msg.riskCard.summary}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Recommendation</p>
                          <p className="text-sm text-foreground">{msg.riskCard.recommendation}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground">Confidence:</p>
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${msg.riskCard.confidence}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-foreground">{msg.riskCard.confidence}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Describe symptoms..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              className="bg-muted/50"
            />
            <Button onClick={send} size="icon" className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
