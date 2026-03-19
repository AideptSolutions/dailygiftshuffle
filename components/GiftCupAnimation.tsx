'use client';

// GiftCupAnimationV2 — PREVIEW
// Changes vs V1:
//   • Cup shifted down: bottom pivot y=220→281 (gap to landing zone closed ~10%)
//   • Cup height reduced ~28% total: 110px → 79px (top y=110→202)
//   • ViewBox tightly clipped to content: "0 192 700 230"
//   • Gifts scaled 1.05x

export default function GiftCupAnimation() {
  return (
    <div className="flex justify-center w-full">
      <div style={{ width: 'clamp(220px, 38vw, 360px)' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 192 700 230"
          width="100%"
          style={{ display: 'block', overflow: 'visible' }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="gs2-cupGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#ff9090"/>
              <stop offset="12%"  stopColor="#ee4444"/>
              <stop offset="45%"  stopColor="#d42020"/>
              <stop offset="78%"  stopColor="#b01010"/>
              <stop offset="100%" stopColor="#780808"/>
            </linearGradient>
            <linearGradient id="gs2-rimTopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#f08888"/>
              <stop offset="40%"  stopColor="#e03030"/>
              <stop offset="100%" stopColor="#901818"/>
            </linearGradient>
            <linearGradient id="gs2-rimBandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#f47878"/>
              <stop offset="35%"  stopColor="#c82020"/>
              <stop offset="100%" stopColor="#6e0808"/>
            </linearGradient>
            <linearGradient id="gs2-btmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#c01a1a"/>
              <stop offset="100%" stopColor="#780a0a"/>
            </linearGradient>
            <radialGradient id="gs2-gndGrad" cx="50%" cy="40%" r="50%">
              <stop offset="0%"   stopColor="rgba(80,20,100,0.28)"/>
              <stop offset="100%" stopColor="rgba(80,20,100,0)"/>
            </radialGradient>
            <linearGradient id="gs2-glossGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.38)"/>
              <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
            </linearGradient>

            <style>{`
              /* Cup: pivot at y=281, top rim at y=202 (height=79px) */
              #gs2-cup {
                transform-origin: 175px 281px;
                animation: gs2-cupAnim 6s cubic-bezier(.4,0,.6,1) infinite;
              }
              @keyframes gs2-cupAnim {
                0%   { transform: rotate(0deg)   translateX(0px);  }
                4%   { transform: rotate(0deg)   translateX(0px);  }
                9%   { transform: rotate(-9deg)  translateX(-6px); }
                14%  { transform: rotate(9deg)   translateX(6px);  }
                19%  { transform: rotate(-9deg)  translateX(-6px); }
                24%  { transform: rotate(9deg)   translateX(6px);  }
                29%  { transform: rotate(-6deg)  translateX(-4px); }
                34%  { transform: rotate(6deg)   translateX(4px);  }
                38%  { transform: rotate(-3deg)  translateX(-2px); }
                44%  { transform: rotate(115deg) translateX(0px);  }
                47%  { transform: rotate(111deg) translateX(0px);  }
                49%  { transform: rotate(116deg) translateX(0px);  }
                75%  { transform: rotate(114deg) translateX(0px);  }
                85%  { transform: rotate(0deg)   translateX(0px);  }
                100% { transform: rotate(0deg)   translateX(0px);  }
              }

              #gs2-ground-shadow { animation: gs2-gShadow 6s ease-in-out infinite; }
              @keyframes gs2-gShadow {
                0%, 62% { opacity: 0;   }
                72%     { opacity: 0.5; }
                82%     { opacity: 0.5; }
                90%     { opacity: 0;   }
                100%    { opacity: 0;   }
              }

              /* Gifts: cup shifted +11px in Y vs last version (bottom 270→281), so start y=315+11=326 */
              #gs2-g1 { transform-origin:0px 0px; animation: gs2-g1 6s ease-out infinite; }
              @keyframes gs2-g1 {
                0%,41%  { transform:translate(276px,326px)rotate(0deg);   opacity:0; }
                44%     { transform:translate(276px,326px)rotate(12deg);  opacity:1; }
                51%     { transform:translate(362px,250px)rotate(92deg);  opacity:1; }
                58%     { transform:translate(442px,366px)rotate(188deg); opacity:1; }
                62%     { transform:translate(457px,390px)rotate(212deg); opacity:1; }
                64%     { transform:translate(457px,374px)rotate(218deg); opacity:1; }
                66%     { transform:translate(457px,390px)rotate(222deg); opacity:1; }
                82%     { transform:translate(457px,390px)rotate(222deg); opacity:1; }
                89%     { transform:translate(457px,390px)rotate(222deg); opacity:0; }
                100%    { transform:translate(276px,326px)rotate(0deg);   opacity:0; }
              }

              #gs2-g2 { transform-origin:0px 0px; animation: gs2-g2 6s ease-out infinite; }
              @keyframes gs2-g2 {
                0%,43%  { transform:translate(276px,326px)rotate(0deg);    opacity:0; }
                46%     { transform:translate(276px,326px)rotate(-14deg);  opacity:1; }
                53%     { transform:translate(352px,260px)rotate(-88deg);  opacity:1; }
                60%     { transform:translate(412px,363px)rotate(-182deg); opacity:1; }
                64%     { transform:translate(427px,384px)rotate(-204deg); opacity:1; }
                66%     { transform:translate(427px,369px)rotate(-210deg); opacity:1; }
                68%     { transform:translate(427px,384px)rotate(-215deg); opacity:1; }
                82%     { transform:translate(427px,384px)rotate(-215deg); opacity:1; }
                89%     { transform:translate(427px,384px)rotate(-215deg); opacity:0; }
                100%    { transform:translate(276px,326px)rotate(0deg);    opacity:0; }
              }

              #gs2-g3 { transform-origin:0px 0px; animation: gs2-g3 6s ease-out infinite; }
              @keyframes gs2-g3 {
                0%,45%  { transform:translate(276px,326px)rotate(0deg);   opacity:0; }
                48%     { transform:translate(276px,326px)rotate(22deg);  opacity:1; }
                55%     { transform:translate(336px,240px)rotate(104deg); opacity:1; }
                62%     { transform:translate(388px,360px)rotate(212deg); opacity:1; }
                65%     { transform:translate(400px,378px)rotate(236deg); opacity:1; }
                67%     { transform:translate(400px,363px)rotate(243deg); opacity:1; }
                69%     { transform:translate(400px,378px)rotate(248deg); opacity:1; }
                82%     { transform:translate(400px,378px)rotate(248deg); opacity:1; }
                89%     { transform:translate(400px,378px)rotate(248deg); opacity:0; }
                100%    { transform:translate(276px,326px)rotate(0deg);   opacity:0; }
              }

              #gs2-g4 { transform-origin:0px 0px; animation: gs2-g4 6s ease-out infinite; }
              @keyframes gs2-g4 {
                0%,47%  { transform:translate(276px,326px)rotate(0deg);    opacity:0; }
                50%     { transform:translate(276px,326px)rotate(-22deg);  opacity:1; }
                57%     { transform:translate(346px,270px)rotate(-104deg); opacity:1; }
                64%     { transform:translate(512px,372px)rotate(-218deg); opacity:1; }
                68%     { transform:translate(527px,395px)rotate(-244deg); opacity:1; }
                70%     { transform:translate(527px,379px)rotate(-251deg); opacity:1; }
                72%     { transform:translate(527px,395px)rotate(-256deg); opacity:1; }
                82%     { transform:translate(527px,395px)rotate(-256deg); opacity:1; }
                89%     { transform:translate(527px,395px)rotate(-256deg); opacity:0; }
                100%    { transform:translate(276px,326px)rotate(0deg);    opacity:0; }
              }

              #gs2-g5 { transform-origin:0px 0px; animation: gs2-g5 6s ease-out infinite; }
              @keyframes gs2-g5 {
                0%,49%  { transform:translate(276px,326px)rotate(0deg);   opacity:0; }
                52%     { transform:translate(276px,326px)rotate(26deg);  opacity:1; }
                59%     { transform:translate(328px,232px)rotate(112deg); opacity:1; }
                66%     { transform:translate(376px,356px)rotate(238deg); opacity:1; }
                69%     { transform:translate(384px,372px)rotate(260deg); opacity:1; }
                71%     { transform:translate(384px,357px)rotate(267deg); opacity:1; }
                73%     { transform:translate(384px,372px)rotate(273deg); opacity:1; }
                82%     { transform:translate(384px,372px)rotate(273deg); opacity:1; }
                89%     { transform:translate(384px,372px)rotate(273deg); opacity:0; }
                100%    { transform:translate(276px,326px)rotate(0deg);   opacity:0; }
              }

              #gs2-g6 { transform-origin:0px 0px; animation: gs2-g6 6s ease-out infinite; }
              @keyframes gs2-g6 {
                0%,51%  { transform:translate(276px,326px)rotate(0deg);    opacity:0; }
                54%     { transform:translate(276px,326px)rotate(-11deg);  opacity:1; }
                61%     { transform:translate(332px,276px)rotate(-76deg);  opacity:1; }
                68%     { transform:translate(482px,370px)rotate(-188deg); opacity:1; }
                71%     { transform:translate(497px,392px)rotate(-212deg); opacity:1; }
                73%     { transform:translate(497px,377px)rotate(-219deg); opacity:1; }
                75%     { transform:translate(497px,392px)rotate(-224deg); opacity:1; }
                82%     { transform:translate(497px,392px)rotate(-224deg); opacity:1; }
                89%     { transform:translate(497px,392px)rotate(-224deg); opacity:0; }
                100%    { transform:translate(276px,326px)rotate(0deg);    opacity:0; }
              }

              #gs2-g7 { transform-origin:0px 0px; animation: gs2-g7 6s ease-out infinite; }
              @keyframes gs2-g7 {
                0%,53%  { transform:translate(276px,326px)rotate(0deg);   opacity:0; }
                56%     { transform:translate(276px,326px)rotate(19deg);  opacity:1; }
                63%     { transform:translate(322px,250px)rotate(86deg);  opacity:1; }
                70%     { transform:translate(542px,363px)rotate(197deg); opacity:1; }
                73%     { transform:translate(557px,385px)rotate(222deg); opacity:1; }
                75%     { transform:translate(557px,369px)rotate(230deg); opacity:1; }
                77%     { transform:translate(557px,385px)rotate(236deg); opacity:1; }
                82%     { transform:translate(557px,385px)rotate(236deg); opacity:1; }
                89%     { transform:translate(557px,385px)rotate(236deg); opacity:0; }
                100%    { transform:translate(276px,326px)rotate(0deg);   opacity:0; }
              }
            `}</style>
          </defs>

          {/* Ground shadow — cy shifted to 406 */}
          <ellipse id="gs2-ground-shadow" cx="472" cy="406" rx="200" ry="17" fill="url(#gs2-gndGrad)"/>

          {/* ── CUP — top y=202, bottom y=281, height=79px ── */}
          <g id="gs2-cup">
            <path d="M 139,202 L 211,202 L 205,281 L 145,281 Z" fill="url(#gs2-cupGrad)"/>
            <path d="M 139,202 L 154,202 L 150,256 L 145,256 Z" fill="url(#gs2-glossGrad)"/>
            <path d="M 197,202 L 211,202 L 205,281 L 200,281 Z" fill="rgba(0,0,0,0.22)"/>
            <path d="M 141,236 L 209,236 L 207,244 L 143,244 Z" fill="rgba(0,0,0,0.12)"/>
            <path d="M 141,234 L 209,234 L 209,237 L 141,237 Z" fill="rgba(255,255,255,0.10)"/>
            <path d="M 139,202 L 211,202 L 211,211 L 139,211 Z" fill="url(#gs2-rimBandGrad)"/>
            <ellipse cx="175" cy="202" rx="36" ry="10" fill="url(#gs2-rimTopGrad)"/>
            <ellipse cx="175" cy="201" rx="34" ry="8.5" fill="none" stroke="rgba(255,160,160,0.5)" strokeWidth="2"/>
            <ellipse cx="175" cy="205" rx="30" ry="7"  fill="#220a0a" opacity="0.82"/>
            <ellipse cx="166" cy="204" rx="10" ry="3"  fill="rgba(255,120,120,0.18)"/>
            <ellipse cx="175" cy="281" rx="30" ry="8"  fill="url(#gs2-btmGrad)"/>
            <ellipse cx="175" cy="281" rx="30" ry="8"  fill="none" stroke="rgba(200,80,80,0.4)" strokeWidth="1.5"/>
          </g>

          {/* ── GIFTS — 1.05x scale ── */}
          {[
            { id:'gs2-g1', fill:'#5B9BD5', bow:'#3a78b0' },
            { id:'gs2-g2', fill:'#E8A84C', bow:'#c07830' },
            { id:'gs2-g3', fill:'#6BB536', bow:'#4a8020' },
            { id:'gs2-g4', fill:'#9B7BBD', bow:'#705090' },
            { id:'gs2-g5', fill:'#F5D020', bow:'#c8a000' },
            { id:'gs2-g6', fill:'#F07070', bow:'#c03838' },
            { id:'gs2-g7', fill:'#7BC8E0', bow:'#4a9ab8' },
          ].map(({ id, fill, bow }) => (
            <g key={id} id={id}>
              <rect x="-14.7" y="-14.7" width="29.4" height="29.4" rx="2.625" fill={fill}/>
              <rect x="-14.7" y="-5.25" width="29.4" height="10.5" fill="rgba(255,255,255,0.72)"/>
              <rect x="-5.25" y="-14.7" width="10.5" height="29.4" fill="rgba(255,255,255,0.72)"/>
              <ellipse cx="-6.3" cy="-14.7" rx="6.3" ry="3.675" transform="rotate(-28,-6.3,-14.7)" fill={bow}/>
              <ellipse cx="6.3"  cy="-14.7" rx="6.3" ry="3.675" transform="rotate(28,6.3,-14.7)"   fill={bow}/>
              <circle  cx="0"   cy="-14.7" r="3.15"                                                 fill={bow}/>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
