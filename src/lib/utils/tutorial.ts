import { StepType } from "@reactour/tour";
import configuration from "../../../configuration/configuration";

export const dataVisTutorialSteps: StepType[] = [
  {
    selector: '.datavis-selector',
    content: `Welcome to ${configuration.title}! This website is made using the DataVis Framework and the following tutorial will give you a quick introduction to the tool.`
  },
  {
    selector: '.datavis-sidebar-content-selector',
    content: 'Second'
  },
  {
    selector: '.datavis-sidebar-nested-selector',
    content: 'Third'
  },
  {
    selector: '.datavis-header-search-selector',
    content: 'Four'
  },
  {
    selector: '.datavis-header-actions-selector',
    content: 'Five',
  },
  {
    selector: '.datavis-header-settings-selector',
    content: 'Six'
  },
  {
    selector: '.datavis-content-dnd-selector',
    content: 'Seven'
  }
]
