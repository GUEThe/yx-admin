import { genCode } from './generator';
import path from 'path';
import { PROJECT_DIR } from './config';
/**
 * 设置的课程颜色
 */
const courseHexColors = [
  '#02BB00',
  '#6B69D5',
  '#00B7C2',
  '#1A776F',
  '#FF5F5F',
  '#EA4C88',
  '#64B193',
  '#BA78CD',
  '#FCAA55',
  '#10AEFF',
  '#90AEFF',
  '#CBA07A',
];

class Color {
  constructor(readonly name: string, readonly className: string, readonly color: string) {}
}

const styleTpl = `
/*DO NOT EDIT manual*/
{% for color in colors %}
@{{color.name}}:{{color.color}};
{% endfor %}

{% for color in colors %}
.{{color.className}}{
  color: white;
  background:{{color.color}};
}
{% endfor %}

`;
function genCourseColorStyles(colors: Color[]) {
  const destPath = path.join(PROJECT_DIR, 'src/styles/course_colors.less');
  genCode(styleTpl, destPath, { colors });
}

const enumTpl = `
/*DO NOT EDIT manual*/

export const enum CourseColors{
{% for color in colors %}
  {{color.name}}= "{{color.color}}",
{% endfor %}
}

export const courseColorClassNames: string[] = [
{% for color in colors %}
  "{{color.className}}",
{% endfor %}
]

export const courseClassNameColorMap  = {
{% for color in colors %}
  "{{color.className}}":"{{color.color}}",
{% endfor %}
}

`;
function genCourseColorEnums(colors: Color[]) {
  const destPath = path.join(PROJECT_DIR, 'src/store/course_color_enum.ts');
  genCode(enumTpl, destPath, { colors });
}

function main() {
  const courseColors: Color[] = [];
  for (let i = 0; i < courseHexColors.length; i++) {
    const no = i + 1;
    const name = `courseColor${no}`;
    const className = `course-color-${no}`;
    const color = courseHexColors[i];
    courseColors.push(new Color(name, className, color));
  }

  genCourseColorStyles(courseColors);
  genCourseColorEnums(courseColors);
}

main();
