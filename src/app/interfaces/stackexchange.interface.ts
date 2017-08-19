export interface StackexchangeResponseProfile {
  has_more: boolean;
  items: Array<StackexchangeProfile>;
  quota_max: number;
  quota_remaining: number;
}

export interface StackexchangeResponseBadges {
  has_more: boolean;
  items: Array<StackexchangeBadges>;
  quota_max: number;
  quota_remaining: number;
}

export interface StackexchangeResponseTags {
  has_more: boolean;
  items: Array<StackexchangeTags>;
  quota_max: number;
  quota_remaining: number;
}

export interface StackexchangeResponseAnswers {
  has_more: boolean;
  items: Array<StackexchangeAnswers>;
  quota_max: number;
  quota_remaining: number;
}

export interface StackexchangeResponseQuestion {
  has_more: boolean;
  items: Array<StackexchangeQuestion>;
  quota_max: number;
  quota_remaining: number;
}

export interface StackexchangeProfile {
  account_id: number;
  age: number;
  badge_counts: {
    bronze: number;
    gold: number;
    silver: number;
  };
  creation_date: number;
  display_name: string;
  is_employee: boolean;
  last_access_date: number;
  last_modified_date: number;
  link: string;
  location: string;
  profile_image: string;
  reputation: number;
  reputation_change_day: number;
  reputation_change_month: number;
  reputation_change_quarter: number;
  reputation_change_week: number;
  reputation_change_year: number;
  user_id: number;
  user_type: string;
  website_url: string;
}

export interface StackexchangeOwner {
  display_name: string;
  link: string;
  profile_image: string;
  reputation: number;
  user_id: number;
  user_type: string;
}

export interface StackexchangeBadges {
  award_count: number;
  badge_id: number;
  badge_type: string;
  link: string;
  name: string;
  rank: string;
  user: StackexchangeOwner;
}

export interface StackexchangeTags {
  count: number;
  has_synonyms: boolean;
  is_moderator_only: boolean;
  is_required: boolean;
  name: string;
  user_id: number;
}

export interface StackexchangeAnswers {
  answer_id: number;
  creation_date: number;
  is_accepted: boolean;
  last_activity_date: number;
  owner: StackexchangeOwner;
  question_id: number;
  score: number;
  title: string;
}

export interface StackexchangeQuestion {
  accepted_answer_id: number;
  answer_count: number;
  creation_date: number;
  is_answered: boolean;
  last_activity_date: number;
  last_edit_date: number;
  link: string;
  owner: StackexchangeOwner;
  question_id: number;
  score: number;
  tags: Array<string>;
  title: string;
  view_count: number;
}
