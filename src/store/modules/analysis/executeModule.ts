// executeModule.ts
import { Commit } from 'vuex';

interface ExecuteState {
    analysisType: string;
    wbcDiffVal: string;
    stitchCount: string;
}

interface ExecuteModule {
    state: () => ExecuteState;
    mutations: {
        analysisTypeSet: (state: ExecuteState, value: string) => void;
        wbcDiffValSet: (state: ExecuteState, value: string) => void;
        stitchCountSet: (state: ExecuteState, value: string) => void;
    };
    actions: {
        setAnalysisType: (context: { commit: Commit }, value: string) => void;
        setWbcDiffValSet: (context: { commit: Commit }, value: string) => void;
        setStitchCountSet: (context: { commit: Commit }, value: string) => void;
    };
}

export const executeModule: ExecuteModule = {
    state: () => ({
        analysisType: '',
        wbcDiffVal: '',
        stitchCount: '',
    }),
    mutations: {
        analysisTypeSet(state: ExecuteState, value: string): void {
            state.analysisType = value;
        },
        wbcDiffValSet(state: ExecuteState, value: string): void {
            state.analysisType = value;
        },
        stitchCountSet(state: ExecuteState, value: string): void {
            state.analysisType = value;
        },
    },
    actions: {
        setAnalysisType({ commit }: { commit: Commit }, value: string): void {
            commit('analysisTypeSet', value);
        },
        setWbcDiffValSet({ commit }: { commit: Commit }, value: string): void {
            commit('wbcDiffValSet', value);
        },
        setStitchCountSet({ commit }: { commit: Commit }, value: string): void {
            commit('stitchCountSet', value);
        },
    },
};
