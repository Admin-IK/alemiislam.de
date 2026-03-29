"use client";

import { FACEBOOK_URL } from "@/lib/site";

const PLUGIN_BASE = "https://www.facebook.com/plugins/page.php";

function pagePluginSrc(width: number, height: number): string {
  const params = new URLSearchParams({
    href: FACEBOOK_URL,
    tabs: "timeline",
    width: String(width),
    height: String(height),
    small_header: "false",
    adapt_container_width: "true",
    hide_cover: "false",
    show_facepile: "true",
  });
  return `${PLUGIN_BASE}?${params.toString()}`;
}

type Props = {
  iframeTitle: string;
};

export function FacebookPageEmbed({ iframeTitle }: Props) {
  return (
    <div className="facebook-page-embed card" style={{ padding: 0 }}>
      <iframe
        title={iframeTitle}
        src={pagePluginSrc(500, 720)}
        height={720}
        style={{
          width: "100%",
          border: "none",
          overflow: "hidden",
          display: "block",
          minHeight: 480,
        }}
        scrolling="no"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      />
    </div>
  );
}
