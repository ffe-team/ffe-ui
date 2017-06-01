/**
 * @desc Video component interface, refer to w3c standard media interface.
 * @r
 * @interface VideoPropTypes
 */
interface VideoPropTypes {
  // { src, type } data structure
  source: [object],
  height?: number,
  width?: number,
  preload?: boolean,
  poster?: string,
  autoplay?: boolean,
  controls?: boolean,
  muted?: boolean,
  playBackRate?: number,
  duration?: number,
  currentTime?: number,
  ended?: boolean,
  loop?: boolean,
  paused?: boolean,
  mediaGroup?: [object],
  controller?: object,
  x5VideoPlayerFullscreen: boolean,
  x5VideoPlayerType: boolean,
  playsInline: boolean,
  // live mode
  live?: boolean,

  className?: string,
  style?: React.CSSProperties,

  onReady?: (e: any) => void,
  onExitFullscreen?: (e: any) => void,
  onEnterFullscreen?: (e: any) => void,
  onLoadStart?: (e: any) => void,
  onLoad?: (e: any) => void,
  onLoaded?: (e: any) => void,
  onCanPlay?: (e: any) => void,
  onPlay?: (e: any) => void,
  onPlaying?: (e: any) => void,
  onRateChange?: (e: any) => void,
  onDurationChange?: (e: any) => void,
  onVolumeChange?: (e: any) => void,
  onWaiting?: (e:any) => void,
  onSuspend?: (e:any) => void,
  onStalled?: (e:any) => void,
  onAbort?: (e:any) => void,
  onSeeking?: (e: any) => void,
  onSeeked?: (e: any) => void,
  onEnd?: (e: any) => void,
  onResize?: (e:any) => void,
}

export default VideoPropTypes