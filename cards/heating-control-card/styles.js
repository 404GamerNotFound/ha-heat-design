export const heatingControlCardStyles = `
      ha-card {
        --ha-card-background: var(--card-bg-start, #ffa20f);
        position: relative;
        border-radius: 30px;
        overflow: hidden;
        background: var(--card-bg-start, #ffa20f);
        color: #fff;
        font-family: var(--primary-font-family, "Roboto", sans-serif);
      }

      .wrapper {
        position: relative;
        padding: 20px;
        min-height: 420px;
        box-sizing: border-box;
        background: linear-gradient(180deg, var(--card-bg-start, #ffa20f) 0%, var(--card-bg-end, #ff9800) 100%);
      }

      .wrapper.desktop-compact {
        padding: 14px;
        min-height: 320px;
      }

      .top-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 14px;
        letter-spacing: 0.8px;
      }

      .label {
        font-size: 11px;
        text-transform: uppercase;
        opacity: 0.78;
      }

      .small-value {
        margin-top: 4px;
        font-size: 18px;
        font-weight: 500;
      }

      .metric-trigger {
        cursor: pointer;
        border-radius: 12px;
        padding: 2px 8px 4px;
        margin: -2px -8px -4px;
        transition: background 0.2s ease, transform 0.2s ease;
      }

      .metric-trigger:hover,
      .metric-trigger:focus-visible {
        background: rgba(255, 255, 255, 0.15);
        transform: translateY(-1px);
        outline: none;
      }

      .metric-trigger.disabled {
        cursor: default;
        opacity: 0.7;
      }

      .metric-trigger.disabled:hover,
      .metric-trigger.disabled:focus-visible {
        background: transparent;
        transform: none;
      }

      .main-temperature {
        text-align: center;
        font-size: 52px;
        font-weight: 500;
        line-height: 1;
        margin: 8px 0 12px;
      }

      .wrapper.desktop-compact .main-temperature {
        font-size: 42px;
        margin: 4px 0 8px;
      }

      .main-temperature .unit {
        font-size: 23px;
        margin-left: 4px;
      }

      .wrapper.desktop-compact .main-temperature .unit {
        font-size: 20px;
      }

      .hud-slider-wrap {
        width: 220px;
        height: 310px;
        margin: 0 auto 20px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .wrapper.desktop-compact .hud-slider-wrap {
        width: 180px;
        height: 230px;
        margin: 0 auto 12px;
      }

      .slider-shell {
        position: absolute;
        width: 140px;
        height: 280px;
        border-radius: 42px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.18) 100%);
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
      }

      .wrapper.desktop-compact .slider-shell {
        width: 106px;
        height: 210px;
      }

      #temp-slider.temp-slider-hud {
        position: relative;
        appearance: none;
        -webkit-appearance: none;
        width: 260px;
        height: 26px;
        transform: rotate(-90deg);
        border-radius: 999px;
        background: transparent;
        outline: none;
      }

      .wrapper.desktop-compact #temp-slider.temp-slider-hud {
        width: 200px;
      }

      .hud-slider-wrap.horizontal {
        --horizontal-slider-shell-height: var(--heating-horizontal-slider-shell-height, 90px);
        width: 320px;
        height: calc(var(--horizontal-slider-shell-height) + 60px);
      }

      .wrapper.desktop-compact .hud-slider-wrap.horizontal {
        width: 250px;
        height: calc(var(--horizontal-slider-shell-height) + 50px);
      }

      .hud-slider-wrap.horizontal .slider-shell {
        width: 290px;
        height: var(--horizontal-slider-shell-height);
      }

      .wrapper.desktop-compact .hud-slider-wrap.horizontal .slider-shell {
        width: 220px;
        height: var(--horizontal-slider-shell-height);
      }

      .hud-slider-wrap.horizontal #temp-slider.temp-slider-hud {
        width: 270px;
        transform: none;
      }

      .wrapper.desktop-compact .hud-slider-wrap.horizontal #temp-slider.temp-slider-hud {
        width: 210px;
      }

      #temp-slider.temp-slider-hud::-webkit-slider-runnable-track {
        height: 16px;
        border-radius: 999px;
        background: linear-gradient(90deg, #f4f4f4 var(--fill, 50%), rgba(255, 255, 255, 0.4) var(--fill, 50%));
      }

      #temp-slider.temp-slider-hud::-moz-range-track {
        height: 16px;
        border-radius: 999px;
        background: linear-gradient(90deg, #f4f4f4 var(--fill, 50%), rgba(255, 255, 255, 0.4) var(--fill, 50%));
      }

      #temp-slider.temp-slider-hud::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 112px;
        height: 108px;
        margin-top: -46px;
        border-radius: 30px;
        border: 1px solid rgba(255, 255, 255, 0.55);
        background: #f2f2f2;
        cursor: pointer;
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
      }

      .wrapper.desktop-compact #temp-slider.temp-slider-hud::-webkit-slider-thumb {
        width: 80px;
        height: 78px;
        margin-top: -30px;
        border-radius: 20px;
      }

      #temp-slider.temp-slider-hud::-moz-range-thumb {
        width: 112px;
        height: 108px;
        border-radius: 30px;
        border: 1px solid rgba(255, 255, 255, 0.55);
        background: #f2f2f2;
        cursor: pointer;
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
      }

      .wrapper.desktop-compact #temp-slider.temp-slider-hud::-moz-range-thumb {
        width: 80px;
        height: 78px;
        border-radius: 20px;
      }

      .hud-slider-wrap.horizontal #temp-slider.temp-slider-hud {
        --horizontal-slider-track-height: var(--heating-horizontal-slider-track-height, 12px);
        --horizontal-slider-thumb-size: var(--heating-horizontal-slider-thumb-size, 26px);
      }

      .hud-slider-wrap.horizontal #temp-slider.temp-slider-hud::-webkit-slider-runnable-track {
        height: var(--horizontal-slider-track-height);
      }

      .hud-slider-wrap.horizontal #temp-slider.temp-slider-hud::-moz-range-track {
        height: var(--horizontal-slider-track-height);
      }

      .hud-slider-wrap.horizontal #temp-slider.temp-slider-hud::-webkit-slider-thumb {
        width: var(--horizontal-slider-thumb-size);
        height: var(--horizontal-slider-thumb-size);
        margin-top: calc((var(--horizontal-slider-track-height) - var(--horizontal-slider-thumb-size)) / 2);
        border-radius: 50%;
      }

      .hud-slider-wrap.horizontal #temp-slider.temp-slider-hud::-moz-range-thumb {
        width: var(--horizontal-slider-thumb-size);
        height: var(--horizontal-slider-thumb-size);
        border-radius: 50%;
      }

      .bottom-row {
        margin-top: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
      }

      .wrapper.desktop-compact .bottom-row {
        margin-top: 8px;
      }

      .status {
        font-size: 12px;
        opacity: 0.9;
        padding: 6px 10px;
        border-radius: 16px;
        background: rgba(0, 0, 0, 0.12);
      }

      .heating-toggle {
        border: 1px solid rgba(255, 255, 255, 0.45);
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.2);
        color: #fff;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.4px;
        padding: 6px 10px;
        cursor: pointer;
      }

      .heating-toggle.off {
        background: rgba(0, 0, 0, 0.18);
      }

      .heating-toggle:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }

      .name {
        font-size: 14px;
        font-weight: 500;
        opacity: 0.95;
        margin-left: auto;
      }

      .optional-info {
        margin-top: 12px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .optional-info:empty {
        display: none;
      }

      .optional-info-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.12);
        padding: 6px 10px;
      }

      .optional-info-label {
        opacity: 0.85;
        letter-spacing: 0.3px;
        text-transform: uppercase;
      }

      .optional-info-value {
        font-weight: 600;
      }

      .optional-info-hints {
        border: 1px dashed rgba(255, 255, 255, 0.45);
        border-radius: 10px;
        padding: 8px 10px;
        background: rgba(0, 0, 0, 0.12);
      }

      .optional-info-hint {
        font-size: 12px;
        line-height: 1.35;
        color: rgba(255, 255, 255, 0.92);
      }

      .chart-drawer-overlay {
        position: absolute;
        inset: 0;
        background: rgba(5, 9, 16, 0.42);
        backdrop-filter: blur(2px);
        transition: opacity 0.25s ease;
      }

      .chart-drawer {
        position: absolute;
        top: 0;
        right: 0;
        width: min(86%, 360px);
        height: 100%;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.93), rgba(245, 248, 255, 0.96));
        color: #17212f;
        border-top-left-radius: 28px;
        border-bottom-left-radius: 28px;
        box-shadow: -14px 0 38px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.28s ease;
        z-index: 5;
        padding: 18px 14px 12px;
        box-sizing: border-box;
      }

      .chart-drawer-overlay.hidden,
      .chart-drawer.hidden {
        pointer-events: none;
        opacity: 0;
      }

      .chart-drawer.visible {
        transform: translateX(0);
      }

      .chart-drawer-overlay.visible {
        opacity: 1;
        z-index: 4;
      }

      .chart-drawer-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 10px;
      }

      .chart-title {
        font-size: 17px;
        font-weight: 700;
      }

      .chart-subtitle {
        margin-top: 4px;
        font-size: 12px;
        color: rgba(23, 33, 47, 0.72);
      }

      .chart-close {
        border: none;
        background: rgba(23, 33, 47, 0.08);
        color: #17212f;
        border-radius: 999px;
        width: 30px;
        height: 30px;
        font-size: 15px;
        cursor: pointer;
      }

      .chart-canvas {
        width: 100%;
        height: 220px;
        display: block;
        border-radius: 16px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(238, 243, 251, 0.95));
      }
    `;
