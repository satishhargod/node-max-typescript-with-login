// *************** all file types ************
export const IMAGE_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

export const VIDEO_FILE_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];

export const AUDIO_FILE_TYPES = ['audio/mp3', 'audio/ogg', 'audio/mpeg'];

export const ATTACHMENT_FILE_TYPES = [
  'audio/mp3',
  'audio/ogg',
  'audio/mpeg',
  'video/mp4',
  'video/webm',
  'video/ogg',
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'text/plain',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'application/vnd.ms-excel.sheet.macroEnabled.12',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

// ************* here we define all filed's name which contain file ***********
export const FILE_FIELD_NAME_OBJ = {
  company_logo: {
    directory: '/images/company/logo',
    size: 1024 * 1024 * 2, // 2 mb
    fileTypes: [...IMAGE_FILE_TYPES],
  },
  attachments: {
    directory: '/images/',
    size: 1024 * 1024 * 2, // 2 mb
    fileTypes: [...ATTACHMENT_FILE_TYPES],
  },
  chat_message_image: {
    directory: '/images/',
    size: 1024 * 1024 * 2, // 2 mb
    fileTypes: [...IMAGE_FILE_TYPES],
  },
  course_category_image: {
    directory: '/images/',
    size: 1024 * 1024 * 2, // 2 mb
    fileTypes: [...IMAGE_FILE_TYPES],
  },
  sub_course_category_image: {
    directory: '/images/',
    size: 1024 * 1024 * 2, // 2 mb
    fileTypes: [...IMAGE_FILE_TYPES],
  },
};

export enum FILE_FIELD_ENUMS {
  COMPANY_LOGO = 'company_logo',
  ATTACHMENT = 'attachment',
  COURSE_CATEGORY = 'course_category_image',
  SUB_COURSE_CATEGORY = 'sub_course_category_image',
  CHAT_MESSAGE_IMAGE = 'chat_message_image',
}
