# Source notes: ColdXu/grid-design

Source: [ColdXu/grid-design](https://github.com/ColdXu/grid-design), master branch (README and `img/` last updated 2015; files retrieved 2026-11-19).

The original files are kept in the repository under `assets/grid-design-source/`; the installed skill ships only the SVG equivalents in `skills/sab-grid-design/assets/`. Because the upstream repository has **no license file**, these assets are included with attribution for reference only. If you redistribute this skill, confirm permission with the original author or replace the assets.

The upstream README is in Chinese. The notes below translate the rules and map each file; the original wording is quoted where it matters.

## The four canvases

| Device class | Chinese label | Canvas | CSS width |
| --- | --- | --- | --- |
| Phone | 超小屏幕 手机 | 750 px (retina, 2×) | 375 px |
| Tablet | 小屏幕 平板 | 720 px | 720 px |
| Desktop | 中等屏幕 桌面显示器 | 940 px | 940 px |
| Large desktop | 大屏幕 大桌面显示器 | 1140 px | 1140 px |

The phone canvas is 750 px because the design baseline is 375 CSS px and retina screens need 2× pixels: "手机端设计稿基准尺寸为375px ... 视觉稿的画布大小会是基准的2倍". The tablet canvas is 720 px, slightly narrower than the phone canvas, because the phone canvas is a 2× export size rather than a wider device.

## Layout rules from the source

- "一行中总栅格要等于12，不能多也不可少" — every row totals exactly 12 columns.
- "设计师一定确保内容不得超出栅格线以外" — content must not extend past the grid lines.
- Layouts adapt by changing how many columns a block occupies: "利用栅格数量的变化，使得布局发生改变，达到适应屏幕布局的目的".
- The source recommends the grid for responsive work; without it, use the four canvas widths as the page-size convention.

## Files

### Repository: `assets/grid-design-source/templates/` (Photoshop)

Each PSD is a pink 12-column overlay on a mockup canvas. The canvas is larger than the design width because it includes the device frame; use the column overlay, not the PSD canvas size, as the design width.

| File | PSD canvas | Design width | Notes |
| --- | --- | --- | --- |
| `grid-750-phone.psd` | 768 × 1452 | 750 px (2× phone) | Phone mockup with 12 columns |
| `grid-720-tablet.psd` | 990 × 1450 | 720 px | Tablet mockup with 12 columns |
| `grid-940-desktop.psd` | 1200 × 1452 | 940 px | Desktop mockup with 12 columns |
| `grid-1140-wide.psd` | 1920 × 1450 | 1140 px | Large-desktop mockup with 12 columns |
| `grid-all-canvases.psd` | 5968 × 1792 | all four | The four canvases side by side for comparison |

These are 2015-era PSDs. Open them in Photoshop (or a compatible editor) to place content on the overlay; do not derive CSS from the mockup canvas dimensions.

### Repository: `assets/grid-design-source/diagrams/` (GIF)

| File | Size | What it shows |
| --- | --- | --- |
| `device-canvases.gif` | 1000 × 300 | The four device classes and their canvas widths (750 / 720 / 940 / 1140) |
| `12-column-layout.gif` | 1477 × 904 | A page with the 12 columns overlaid; blocks sit on column lines |
| `layout-comparison.gif` | 4965 × 1491 | The same page at 1140 / 940 / 720 / 375, showing how blocks restack |
| `grid-line-comparison.gif` | 4965 × 1491 | The same comparison with grid lines and `grid=6` / `grid=12` labels |

The comparison diagrams are the clearest illustration of the adaptation rule: at each width the blocks change spans, but every row still totals 12.

### Skill: `skills/sab-grid-design/assets/` (SVG)

Text equivalents generated from the PSD/GIF files above, so the installed skill stays inspectable and passes content scanners:

| File | Size | Replaces |
| --- | --- | --- |
| `templates/grid-750-phone.svg` | 750 × 440 | `grid-750-phone.psd` overlay |
| `templates/grid-720-tablet.svg` | 720 × 440 | `grid-720-tablet.psd` overlay |
| `templates/grid-940-desktop.svg` | 940 × 440 | `grid-940-desktop.psd` overlay |
| `templates/grid-1140-wide.svg` | 1140 × 440 | `grid-1140-wide.psd` overlay |
| `templates/grid-all-canvases.svg` | 1180 × 2006 | `grid-all-canvases.psd` |
| `diagrams/device-canvases.svg` | 1000 × 300 | `device-canvases.gif` |
| `diagrams/12-column-layout.svg` | 940 × 520 | `12-column-layout.gif` |
| `diagrams/layout-comparison.svg` | 1600 × 380 | `layout-comparison.gif` |
| `diagrams/grid-line-comparison.svg` | 1600 × 380 | `grid-line-comparison.gif` |

The SVGs use the same column arithmetic as the PSDs (20 px page margin, 20 px gutter); they are redrawn, not traced, so their column widths are exact rather than raster estimates.

## Original references

The upstream README cites:

- 栅格系统设计, Taobao UED: <http://ued.taobao.org/blog/2008/09/grid_systems/>
- 移动端高清、多屏适配方案: <http://div.io/topic/1092>
- 栅格设计页面展示: <http://mediaqueri.es/>

The README also links to a third-party Photoshop download; that link is intentionally not reproduced here.
