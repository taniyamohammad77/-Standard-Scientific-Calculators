import {test,expect} from '@playwright/test';
test('real worker check, navigation, preference and reset',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
 await expect(page.getByRole('heading',{name:'Every problem.'})).toBeVisible();
 await page.getByText('System check',{exact:true}).click();await expect(page.getByRole('status',{name:'Service status'})).toHaveText('Calculation service: Ready');
 await page.getByRole('button',{name:'Vectors VECTOR'}).click();await expect(page.getByRole('heading',{name:'Vectors',exact:true})).toBeVisible();
 await expect(page.getByText('Calculation tools are coming in Phase 5.')).toBeVisible();
 await page.getByRole('button',{name:'RAD',exact:true}).click();await expect(page.getByRole('button',{name:'RAD',exact:true})).toHaveAttribute('aria-pressed','true');
 await page.getByRole('button',{name:'Run check'}).click();await expect(page.getByRole('status',{name:'Service status'})).toHaveText('Calculation service: Ready');
 await page.getByRole('button',{name:'Reset workspace'}).click();await expect(page.getByRole('heading',{name:'Scientific',exact:true})).toBeVisible();await expect(page.getByRole('button',{name:'DEG',exact:true})).toHaveAttribute('aria-pressed','true');
 expect(errors).toEqual([]);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('all planned modes are accessible with explicit pending state',async({page})=>{await page.goto('/');const modes=page.getByRole('navigation',{name:'Calculation modes'}).getByRole('button');await expect(modes).toHaveCount(10);for(let i=0;i<10;i++){await modes.nth(i).click();await expect(modes.nth(i)).toHaveAttribute('aria-pressed','true');if(i===0)await expect(page.getByLabel('Expression',{exact:true})).toBeVisible();else await expect(page.getByText(/Calculation tools are coming in Phase/)).toBeVisible()}});
