export type DesktopPlatform = "macos" | "windows" | "linux";

export type BrowserPlatform = DesktopPlatform | "mobile" | "unknown";

export interface DownloadUrls {
  macos: string;
  windows: string;
  linux: string;
  fallback: string;
}

interface NavigatorWithUAData extends Navigator {
  userAgentData?: {
    mobile?: boolean;
    platform?: string;
  };
}

export function getBrowserPlatform(): BrowserPlatform {
  if (typeof navigator === "undefined") {
    return "unknown";
  }

  const nav = navigator as NavigatorWithUAData;

  const userAgent = nav.userAgent.toLowerCase();
  const platform = (
    nav.userAgentData?.platform ??
    nav.platform ??
    ""
  ).toLowerCase();

  // Must run before desktop detection:
  // - Android UAs commonly contain "linux"
  // - iPadOS may identify itself as "MacIntel"
  const isMobile =
    nav.userAgentData?.mobile === true ||
    /android|iphone|ipad|ipod|mobile/.test(userAgent) ||
    (platform === "macintel" && nav.maxTouchPoints > 1);

  if (isMobile) return "mobile";

  if (
    platform.includes("mac") ||
    userAgent.includes("macintosh")
  ) {
    return "macos";
  }

  if (
    platform.includes("win") ||
    userAgent.includes("windows")
  ) {
    return "windows";
  }

  if (
    platform.includes("linux") ||
    platform.includes("x11") ||
    userAgent.includes("linux") ||
    userAgent.includes("x11")
  ) {
    return "linux";
  }

  return "unknown";
}

export function isDesktopPlatform(
  platform: BrowserPlatform,
): platform is DesktopPlatform {
  return (
    platform === "macos" ||
    platform === "windows" ||
    platform === "linux"
  );
}

export function getPlatformDownloadUrl(
  platform: DesktopPlatform,
  urls: DownloadUrls,
): string {
  return urls[platform];
}