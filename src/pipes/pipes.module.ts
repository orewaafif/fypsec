import { NgModule } from '@angular/core';
import { ToArrayPipe } from './to-array/to-array';
import { Test } from './test/test';

@NgModule({
	declarations: [ToArrayPipe,
    Test],
	imports: [],
	exports: [ToArrayPipe,
    Test]
})
export class PipesModule {}
