import React, { useState } from "react";
import { retroAudio } from "../../utils/audioSystem";

interface SystemWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemWarningModal: React.FC<SystemWarningModalProps> = ({
  isOpen,
  onClose
}) => {
  const [hasClickedYes, setHasClickedYes] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px"
      }}
      onClick={onClose}
    >
      <div
        className="bevel-raised shadow-2xl"
        style={{
          width: "380px",
          maxWidth: "100%",
          backgroundColor: "#c0c0c0",
          padding: "3px"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="win-titlebar" style={{ background: "linear-gradient(90deg, #800000 0%, #d91e18 100%)" }}>
          <span>System Warning</span>
          <button
            type="button"
            className="win-btn"
            onClick={() => {
              retroAudio.playClick(0.9);
              onClose();
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div
          style={{
            padding: "20px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            backgroundColor: "#c0c0c0"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "36px" }}>⚠️</span>
            <div
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "15px",
                color: "#000",
                lineHeight: "1.4"
              }}
            >
              {hasClickedYes ? (
                <span style={{ color: "#800000", fontWeight: "bold" }}>
                  ERROR 404: Quitting is strictly disabled. You are now stuck in Shashi's awesome portfolio forever! 👾
                </span>
              ) : (
                "Are you sure you want to quit the portfolio session?"
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            {hasClickedYes ? (
              <button
                type="button"
                className="bevel-button"
                onClick={() => {
                  retroAudio.playClick(1.0);
                  setHasClickedYes(false);
                  onClose();
                }}
                style={{ width: "100px", fontWeight: "bold" }}
              >
                Accept Fate
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="bevel-button"
                  onClick={() => {
                    retroAudio.playErrorChord();
                    setHasClickedYes(true);
                  }}
                  style={{ width: "80px", color: "#800000" }}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="bevel-button"
                  onClick={() => {
                    retroAudio.playClick(1.0);
                    onClose();
                  }}
                  style={{ width: "80px", fontWeight: "bold" }}
                  autoFocus
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
