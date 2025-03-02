import type ResearchTopic from "./ResearchTopic";

export default interface ProjectResult {
  topic: ResearchTopic;
  approach: 'qualitative' | 'quantitative';
  methods: string[];
  justification: string;
  feedback: string;
  score: number;
}
