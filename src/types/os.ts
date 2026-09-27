export type WindowId =
  | "about"
  | "projects"
  | "idbadge"
  | "paint"
  | "phone"
  | "terminal"
  | "music"
  | "minesweeper"
  | "messenger"
  | "warning";


export interface WindowState {
  id: WindowId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number | string; height: number | string };
}

export type WallpaperTheme = "bliss" | "cyber" | "sunset" | "matrix" | "riso";
