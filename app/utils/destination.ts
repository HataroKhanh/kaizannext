export type Menu = {
  title: string;
  href: string;
  logo?: string;
};

export type Character = {
  _id: string; // ObjectId -> stringify nếu cần
  id: string;
  tu_vung: string; // zh
  phien_am: string; // pinyin (có thể có dấu '/')
  han_viet: string;
  tu_loai: string; // Động từ, Danh từ...
  nghia_tieng_viet: string; // vi
  vi_du_su_dung?: string;
  from?: string; // ví dụ: "hsk1"
};

export type Vocabulary = {
  _id: string;
  lesson_id: string;
  hsk_level: number;
  title: string;
  topic: string;
  characterIds: string[];
  estimated_minutes: number;
  idx : number;
  idx_in_level : number;
};
